import {
    VIDEO_ADDED,
    VIDEO_DOWNLOAD_STARTED,
    VIDEO_DOWNLOAD_PROGRESS,
    VIDEO_DOWNLOAD_COMPLETE
} from '../actions/action_types';

export default (urls = [], action) => {
    console.log(`action type: ${action.type}`);
    switch (action.type) {
        case VIDEO_ADDED:
            return [action.payload, ...urls];
        case VIDEO_DOWNLOAD_STARTED:
        case VIDEO_DOWNLOAD_PROGRESS:
        case VIDEO_DOWNLOAD_COMPLETE:
            return urls;
        default:
            return urls;
    }
};
