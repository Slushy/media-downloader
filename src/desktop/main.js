import { app, BrowserWindow, ipcMain } from 'electron';
import Ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import ytdl from 'ytdl-core';

import {
    VIDEO_METADATA,
    VIDEO_DOWNLOAD
    // VIDEO_DOWNLOAD_STARTED
    // VIDEO_DOWNLOAD_PROGRESS,
    // VIDEO_DOWNLOAD_COMPLETED
} from '@shared/events';

let mainWindow;
Ffmpeg().setFfmpegPath(path.join(__dirname, 'bin', 'ffmpeg.exe'));

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('close', () => app.quit());
});

ipcMain.on(VIDEO_METADATA, (evt, url) => {
    console.log(`VIDEO_METADATA received with url ${url}`);
    ytdl.getInfo(url, (err, { thumbnail_url, title }) => {
        if (err) return console.error(err);
        console.log(`Thumbnail: ${thumbnail_url}, Title: ${title}`);
    });
});

ipcMain.on(VIDEO_DOWNLOAD, (evt, url) => {
    console.log(`VIDEO_DOWNLOAD received with url ${url}`);
    const stream = ytdl(url, { quality: 'highestaudio' });
    const id = `audio-${Math.random()}`;

    Ffmpeg(stream)
        .on('start', () => {
            console.log('download started');
        })
        .on('progress', (p) => {
            console.log(`${p.targetSize}kb downloaded`);
        })
        .on('error', console.error)
        .on('end', () => {
            console.log('done');
        })
        .save(`${__dirname}/${id}.mp3`);
});

app.on('window-all-closed', () => app.quit());

console.log(`Electron Version ${app.getVersion()}`);
