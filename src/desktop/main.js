import { app, BrowserWindow, ipcMain } from 'electron';
import VideoManager from './video_manager';

import {
    SERVER_DO_VIDEO_DOWNLOAD,
    SERVER_VIDEO_ADDED,
    SERVER_VIDEO_METADATA_RECEIVED,
    SERVER_VIDEO_DOWNLOAD_STARTED,
    SERVER_VIDEO_DOWNLOAD_PROGRESS,
    SERVER_VIDEO_DOWNLOAD_ERROR,
    SERVER_VIDEO_DOWNLOAD_COMPLETED
} from '@shared/events';

let mainWindow, videoManager;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('close', () => app.quit());

    videoManager = new VideoManager(onVideoEvent);
});

ipcMain.on(SERVER_DO_VIDEO_DOWNLOAD, (_, url) => {
    if (!videoManager) throw new Error('Video manager doesn\'t exist');
    const id = videoManager.start(url);
    send(SERVER_VIDEO_ADDED, { id, url });
});

app.on('window-all-closed', () => app.quit());

function onVideoEvent(event, data) {
    switch (event) {
        case 'metadata':
            send(SERVER_VIDEO_METADATA_RECEIVED, {
                id: data.video.id,
                title: data.video.title,
                thumbnail: data.video.thumbnail
            });
            break;
        case 'download_started':
            send(SERVER_VIDEO_DOWNLOAD_STARTED, {
                id: data.video.id
            });
            break;
        case 'download_progress':
            send(SERVER_VIDEO_DOWNLOAD_PROGRESS, {
                id: data.video.id,
                currentBytes: data.curr,
                totalBytes: data.total
            });
            break;
        case 'download_completed':
            send(SERVER_VIDEO_DOWNLOAD_COMPLETED, {
                id: data.video.id
            });
            break;
        case 'error':
            send(SERVER_VIDEO_DOWNLOAD_ERROR, {
                id: data.id,
                error: data.error
            });
            break;
        default:
            throw new Error(`Video event '${event}' not supported`);
    }
}

function send(evt, data) {
    if (!mainWindow) throw new Error(`Trying to fire ${evt} when no window available`);
    console.log(`Emitting ${evt}: ${JSON.stringify(data)}`);
    mainWindow.webContents.send(evt, data);
}

console.log(`Electron Version ${app.getVersion()}`);
