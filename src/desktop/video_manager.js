import path from 'path';
// import fs from 'fs';
import mv from 'mv';
import Ffmpeg from 'fluent-ffmpeg';
import NodeID3 from 'node-id3';
import ytdl from 'ytdl-core';
import uniqid from 'uniqid';
import {
    getSaveFolder,
    getTempFolder
} from '@shared/config';
import Video from './video';

Ffmpeg.setFfmpegPath(path.join(__dirname, 'bin', 'ffmpeg.exe'));

export default class VideoManager {
    constructor(onVideoEventCb) {
        this.eventCb = onVideoEventCb;
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

        return id;
    }

    _download(video) {
        const videoPath = path.join(getTempFolder(), `${video.id}.mp3`);

        const stream = ytdl.downloadFromInfo(video.info)
            .on('response', () => this.eventCb('download_started', { video }))
            .on('progress', (_, curr, total) => this.eventCb('download_progress', { video, curr, total }))
            .on('error', error => this.eventCb('error', { id: video.id, error }));

        Ffmpeg({ source: stream })
            .on('progress', p => {
                console.log(`video.title: ${video.title}, ${p.targetSize}`);
                video.setSize(p.targetSize);
                this.eventCb('metadata', { video });
            })
            .on('error', error => this.eventCb('error', { id: video.id, error }))
            .on('end', () => {
                if (!this.videos[video.id]) return;

                NodeID3.update({
                    title: video.title,
                    APIC: video.image,
                    artist: video.artist,
                    album: video.album
                }, videoPath, (error) => {
                    stream.destroy();

                    if (error) this.eventCb('error', { id: video.id, error });
                    else this.eventCb('download_completed', { video });

                    const finalVideoPath = path.join(getSaveFolder(), `${video.title}.mp3`);
                    mv(videoPath, finalVideoPath, err => {
                        if (err) this.eventCb('error', { id: video.id, error: err });

                        delete this.videos[video.id];
                    });
                });
            })
            .toFormat('mp3')
            .save(videoPath);
    }
}
