import {
    DOWNLOAD_VIDEO,
    CHANGE_SAVE_FOLDER,
    MINIMIZE_WINDOW,
    MAXIMIZE_WINDOW,
    UNMAXIMIZE_WINDOW,
    CLOSE_WINDOW,
    REMOVE_VIDEO
} from './action_types';

export const downloadVideo = url => ({
    type: DOWNLOAD_VIDEO,
    payload: url
});

export const changeSaveFolder = () => ({
    type: CHANGE_SAVE_FOLDER
});

export const minimizeWindow = () => ({
    type: MINIMIZE_WINDOW
});

export const maximizeWindow = () => ({
    type: MAXIMIZE_WINDOW
});

export const unmaximizeWindow = () => ({
    type: UNMAXIMIZE_WINDOW
});

export const closeWindow = () => ({
    type: CLOSE_WINDOW
});

export const removeVideo = id => ({
    type: REMOVE_VIDEO,
    payload: id
});