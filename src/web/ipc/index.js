import { ipcRenderer } from 'electron';
import {
    VIDEO_DOWNLOAD,
    VIDEO_METADATA_RECEIVED,
    VIDEO_DOWNLOAD_STARTED,
    VIDEO_DOWNLOAD_PROGRESS,
    VIDEO_DOWNLOAD_COMPLETED
} from '@shared/events';

/**
 * encapsulates interaction with the main process
 */
export default new class {
    getVideoMetadata(url, onComplete) {
        if (!onComplete) throw new Error('Need a callback defined for retrieving video metadata');
        ipcRenderer.on(VIDEO_METADATA_RECEIVED, onComplete);
        ipcRenderer.send(VIDEO_DOWNLOAD, url);
    }

    downloadVideo(url, onStart, onProgress, onComplete) {
        if (onStart) ipcRenderer.on(VIDEO_DOWNLOAD_STARTED, onStart);
        if (onProgress) ipcRenderer.on(VIDEO_DOWNLOAD_PROGRESS, onProgress);
        if (onComplete) ipcRenderer.on(VIDEO_DOWNLOAD_COMPLETED, onComplete);

        ipcRenderer.send(VIDEO_DOWNLOAD, url);
    }
};
