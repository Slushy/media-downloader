import path from 'path';
import fs from 'fs';
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
            this.videos[id] = video;
            this.eventCb('metadata', { video });

            this._download(video);
        });

        return id;
    }

    removeVideo(id) {
        console.log(`Attempting to remove Video '${id}'`);

        const video = this.videos[id];
        if (video) {
            delete this.videos[id];
            video.stream && video.stream.ffmpegProc.stdin.write('q');
            video.setStream(undefined);
            video.tempPath && fs.unlink(video.tempPath, err => console.log(`Video unlinked error: ${err}`));
            console.log(`Video '${id}' successfully removed`);
        } else {
            console.log(`Video '${id}' was not active`);
        }
    }

    _download(video) {
        const videoPath = path.join(getTempFolder(), `${video.id}.mp3`);
        video.setTempPath(videoPath);

        const stream = ytdl.downloadFromInfo(video.info)
            .on('response', () => this.eventCb('download_started', { video }))
            .on('progress', (_, curr, total) => this.eventCb('download_progress', { video, curr, total }))
            .on('error', error => this.eventCb('error', { id: video.id, error }));
        video.setStream(stream);

        video.setStream(Ffmpeg({ source: stream })
            .on('progress', p => {
                video.setSize(p.targetSize);
                this.eventCb('metadata', { video });
            })
            .on('error', error => this.eventCb('error', { id: video.id, error }))
            .on('end', () => {
                if (!this.videos[video.id]) return;
                video.setStream(undefined);

                NodeID3.update({
                    title: video.title,
                    APIC: video.image,
                    artist: video.artist,
                    album: video.album
                }, videoPath, (error) => {
                    if (error) this.eventCb('error', { id: video.id, error });
                    else this.eventCb('download_completed', { video });

                    const finalVideoPath = path.join(getSaveFolder(), `${video.title}.mp3`);
                    mv(videoPath, finalVideoPath, err => {
                        if (err) {
                            this.eventCb('error', { id: video.id, error: err });
                        } else {
                            // if we don't have an error the temp path has already been removed
                            video.setTempPath(undefined);
                        }

                        this.removeVideo(video.id);
                    });
                });
            })
            .toFormat('mp3')
            .save(videoPath));
    }
}
