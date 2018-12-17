import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';

import VideoManager from './video_manager';
import fs from 'fs';
import path from 'path';

import {
    SERVER_DO_VIDEO_DOWNLOAD,
    SERVER_CHANGE_SAVE_FOLDER,
    SERVER_VIDEO_ADDED,
    SERVER_VIDEO_METADATA_RECEIVED,
    SERVER_VIDEO_DOWNLOAD_STARTED,
    SERVER_VIDEO_DOWNLOAD_PROGRESS,
    SERVER_VIDEO_DOWNLOAD_ERROR,
    SERVER_VIDEO_DOWNLOAD_COMPLETED,
    SERVER_SAVE_FOLDER_CHANGED,
    SERVER_DO_REMOVE_VIDEO,
    SERVER_VIDEO_SHOW_IN_FOLDER,
    SERVER_VIDEO_PLAY
} from '@shared/events';
import * as config from '@shared/config';

const FOLDER_OUTPUT_NAME = 'media-downloader';
config.setIfNotDefined({
    [config.SAVE_FOLDER]: path.join(app.getPath('music'), FOLDER_OUTPUT_NAME),
    [config.TEMP_FOLDER]: path.join(app.getPath('temp'), FOLDER_OUTPUT_NAME)
});
config.onSaveFolderChanged(saveFolder => {
    send(SERVER_SAVE_FOLDER_CHANGED, saveFolder);
});

if (!fs.existsSync(config.getTempFolder())) {
    fs.mkdirSync(config.getTempFolder());
}
if (!fs.existsSync(config.getSaveFolder())) {
    fs.mkdirSync(config.getSaveFolder());
}

let mainWindow, videoManager;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 950,
        height: 610,
        backgroundColor: '#FFFFFFFF',
        frame: true,

        minWidth: 950,
        minHeight: 630,
        show: false
    });
    mainWindow.setMenu(null);
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('close', () => app.quit());
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    videoManager = new VideoManager(onVideoEvent);
});

ipcMain.on(SERVER_DO_VIDEO_DOWNLOAD, (_, url) => {
    if (!videoManager) throw new Error('Video manager doesn\'t exist');
    const id = videoManager.start(url);
    send(SERVER_VIDEO_ADDED, { id, url });
});

ipcMain.on(SERVER_CHANGE_SAVE_FOLDER, () => {
    const saveFolder = dialog.showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: config.getSaveFolder()
    });

    saveFolder && saveFolder.length && config.setSaveFolder(saveFolder[0]);
});

ipcMain.on(SERVER_DO_REMOVE_VIDEO, (_, id) => {
    if (!videoManager) throw new Error('Video manager doesn\'t exist');
    videoManager.removeVideo(id);
});

ipcMain.on(SERVER_VIDEO_SHOW_IN_FOLDER, (_, folder) => {
    shell.openItem(folder);
});

ipcMain.on(SERVER_VIDEO_PLAY, (_, id) => {
    if (!videoManager) throw new Error('Video manager doesn\'t exist');
    videoManager.removeVideo(id);
});

let quitting = false;
app.on('window-all-closed', () => {
    videoManager && videoManager.removeAll();
    quitting = true;
    app.quit();
});

function onVideoEvent(event, data) {
    switch (event) {
        case 'metadata':
            send(SERVER_VIDEO_METADATA_RECEIVED, {
                id: data.video.id,
                title: data.video.title,
                thumbnail: data.video.thumbnail,
                time: data.video.time,
                size: data.video.size
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
                id: data.video.id,
                path: data.video.fullPath
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
    if (quitting) return;
    try {
        if (!mainWindow) throw new Error(`Trying to fire ${evt} when no window available`);
        console.log(`Emitting ${evt}: ${JSON.stringify(data)}`);

        mainWindow.webContents.send(evt, data);
    } catch (ex) {
        console.log(ex);
    }
}

console.log(`Electron Version ${app.getVersion()}`);
