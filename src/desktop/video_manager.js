import path from 'path';
import Ffmpeg from 'fluent-ffmpeg';
import NodeID3 from 'node-id3';
import ytdl from 'ytdl-core';
import uniqid from 'uniqid';
import Video from './video';

Ffmpeg().setFfmpegPath(path.join(__dirname, 'bin', 'ffmpeg.exe'));

export default class VideoManager {

    constructor(onVideoEventCb) {
        this.eventCb = onVideoEventCb;
        this.saveDir = __dirname;
        this.videos = {};
    }

    start(url) {
        console.log(`VideoManager.start: ${url}`);
        const id = `video-${uniqid()}`;

        ytdl.getInfo(url, (error, info) => {
            if (error) {
                this.eventCb('error', { id, error });
                return;
            }

            const video = new Video(id, url, info);
            this.videos[id] = { video, stream: undefined };
            this.eventCb('metadata', { video });

            this._download(video);
        });
    }

    _download(video) {
        const videoPath = `${this.saveDir}/${video.id}.mp3`;

        const stream = ytdl.downloadFromInfo(video.info, { filter: 'audioonly', quality: 'highest' })
            .on('response', () => this.eventCb('download_started', { video }))
            .on('progress', (_, curr, total) => this.eventCb('download_progress', { video, curr, total }))
            .on('error', error => this.eventCb('error', { id: video.id, error }));
        this.videos[video.id].stream = stream;

        Ffmpeg(stream)
            .toFormat('mp3')
            .save(videoPath)
            .on('error', error => this.eventCb('error', { id: video.id, error }))
            .on('end', () => {
                if (!this.videos[video.id]) return;

                NodeID3.update({
                    title: video.title,
                    APIC: video.image,
                    artist: video.artist,
                    album: video.album
                }, videoPath, (error) => {
                    if (error) this.eventCb('error', { id: video.id, error });
                    else this.eventCb('download_completed', { video });

                    delete this.videos[video.id];
                });
            });
    }
}