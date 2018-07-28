import {
    VIDEO_ACTION_ADDED,
    VIDEO_ACTION_METADATA_RECEIVED,
    VIDEO_ACTION_DOWNLOAD_STARTED,
    VIDEO_ACTION_DOWNLOAD_PROGRESS,
    VIDEO_ACTION_DOWNLOAD_COMPLETE
} from '../actions/action_types';

const DEFAULT_STATE = {
    urls: [],
    metadata: {} // [url]: { title, thumbnail }
};

export default (state = DEFAULT_STATE, action) => {
    console.log(`action type: ${action.type}`);
    const { urls, metadata } = state;

    switch (action.type) {
        case VIDEO_ACTION_ADDED: {
            const url = action.payload;
            if (metadata.hasOwnProperty(url)) return state;
            return { urls: [url, ...urls], metadata: { ...metadata, [url]: {} } };
        }
        case VIDEO_ACTION_METADATA_RECEIVED: {
            const { url, title, thumbnail } = action.payload;
            return { urls, metadata: { ...metadata, [url]: { title, thumbnail } } };
        }
        case VIDEO_ACTION_DOWNLOAD_STARTED:
        case VIDEO_ACTION_DOWNLOAD_PROGRESS:
        case VIDEO_ACTION_DOWNLOAD_COMPLETE:
            return state;
        default:
            return state;
    }
};
