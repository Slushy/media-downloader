import ipc from '../ipc';
import {
    VIDEO_ADDED,
    VIDEO_METADATA_RECEIVED,
    VIDEO_DOWNLOAD_STARTED,
    VIDEO_DOWNLOAD_PROGRESS,
    VIDEO_DOWNLOAD_COMPLETE
} from './action_types';

export const addVideo = url => dispatch => {
    ipc.getVideoMetadata(url, () => dispatch({ type: VIDEO_METADATA_RECEIVED, payload: url }));
    dispatch({ type: VIDEO_ADDED, payload: url });
};

export const downloadVideo = url => dispatch => {
    ipc.downloadVideo(url,
        // On Download Start
        () => dispatch({ type: VIDEO_DOWNLOAD_STARTED, payload: url }),
        // On Download Progress
        () => dispatch({ type: VIDEO_DOWNLOAD_PROGRESS, payload: url }),
        // On Download Complete
        () => dispatch({ type: VIDEO_DOWNLOAD_COMPLETE, payload: url })
    );
};
