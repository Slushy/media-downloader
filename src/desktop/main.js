import { app, BrowserWindow, ipcMain } from 'electron';
import {
    VIDEO_DOWNLOAD
    // VIDEO_DOWNLOAD_STARTED,
    // VIDEO_DOWNLOAD_PROGRESS,
    // VIDEO_DOWNLOAD_COMPLETED
} from '@shared/events';

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('close', () => app.quit());
});

ipcMain.on(VIDEO_DOWNLOAD, (evt, url) => {
    console.log(`VIDEO_DOWNLOAD received with url ${url}`);
});

app.on('window-all-closed', () => app.quit());

console.log(`Electron Version ${app.getVersion()}`);
