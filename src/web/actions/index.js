import {
    DOWNLOAD_VIDEO,
    CHANGE_SAVE_FOLDER
} from './action_types';

export const downloadVideo = url => ({
    type: DOWNLOAD_VIDEO,
    payload: url
});

export const changeSaveFolder = () => ({
    type: CHANGE_SAVE_FOLDER
});
