import ipc from '../ipc';
import {
    VIDEO_ACTION_ADDED,
    VIDEO_ACTION_METADATA_RECEIVED,
    VIDEO_ACTION_DOWNLOAD_STARTED,
    VIDEO_ACTION_DOWNLOAD_PROGRESS,
    VIDEO_ACTION_DOWNLOAD_COMPLETE
} from './action_types';

export const addVideo = url => dispatch => {
    ipc.getVideoMetadata(url, (_, { title, thumbnail }) => {
        dispatch({ type: VIDEO_ACTION_METADATA_RECEIVED, payload: { url, title, thumbnail } });
        // start download when metadata is received
        // downloadVideo(url)(dispatch);
    });
    dispatch({ type: VIDEO_ACTION_ADDED, payload: url });
};

export const downloadVideo = url => dispatch => {
    ipc.downloadVideo(url,
        // On Download Start
        () => dispatch({ type: VIDEO_ACTION_DOWNLOAD_STARTED, payload: url }),
        // On Download Progress
        () => dispatch({ type: VIDEO_ACTION_DOWNLOAD_PROGRESS, payload: url }),
        // On Download Complete
        () => dispatch({ type: VIDEO_ACTION_DOWNLOAD_COMPLETE, payload: url })
    );
};
