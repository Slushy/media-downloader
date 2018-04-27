import { DOWNLOAD_VIDEO } from './action_types';

export const downloadVideo = url => {
    return {
        type: DOWNLOAD_VIDEO,
        payload: url
    };
};

