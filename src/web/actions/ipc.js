import {
    VIDEO_ACTION_ADDED,
    VIDEO_ACTION_METADATA_RECEIVED,
    VIDEO_ACTION_DOWNLOAD_STARTED,
    VIDEO_ACTION_DOWNLOAD_PROGRESS,
    VIDEO_ACTION_DOWNLOAD_COMPLETE,
    VIDEO_ACTION_DOWNLOAD_ERROR,
    CONFIG_ACTION_SAVE_FOLDER_CHANGED,
    WINDOW_STATE_CHANGED
} from './action_types';

export const videoAdded = ({ id, url }) => ({
    type: VIDEO_ACTION_ADDED,
    payload: { id, url }
});

export const metadataReceived = ({ id, title, thumbnail, time, size }) => ({
    type: VIDEO_ACTION_METADATA_RECEIVED,
    payload: { id, title, thumbnail, time, size }
});

export const downloadStarted = ({ id }) => ({
    type: VIDEO_ACTION_DOWNLOAD_STARTED,
    payload: { id }
});

export const downloadProgress = ({ id, currentBytes, totalBytes }) => ({
    type: VIDEO_ACTION_DOWNLOAD_PROGRESS,
    payload: { id, currentBytes, totalBytes }
});

export const downloadCompleted = ({ id, path }) => ({
    type: VIDEO_ACTION_DOWNLOAD_COMPLETE,
    payload: { id, path }
});

export const downloadError = ({ id, error }) => ({
    type: VIDEO_ACTION_DOWNLOAD_ERROR,
    payload: { id, error }
});

export const saveFolderChanged = folder => ({
    type: CONFIG_ACTION_SAVE_FOLDER_CHANGED,
    payload: folder
});

export const windowStateChanged = maximized => ({
    type: WINDOW_STATE_CHANGED,
    payload: maximized
});
