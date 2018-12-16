import {
    DOWNLOAD_VIDEO
} from './action_types';

export const downloadVideo = url => ({
    type: DOWNLOAD_VIDEO,
    payload: url
});
