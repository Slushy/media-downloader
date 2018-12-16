import {
    VIDEO_ACTION_ADDED,
    VIDEO_ACTION_METADATA_RECEIVED,
    VIDEO_ACTION_DOWNLOAD_STARTED,
    VIDEO_ACTION_DOWNLOAD_PROGRESS,
    VIDEO_ACTION_DOWNLOAD_COMPLETE
} from '../actions/action_types';

const DEFAULT_STATE = {
    ids: [],
    metadata: {} // [id]: { title, thumbnail }
};

export default (state = DEFAULT_STATE, action) => {
    console.log(`action type: ${action.type}`);
    const { ids, metadata } = state;

    switch (action.type) {
        case VIDEO_ACTION_ADDED: {
            const { id, url } = action.payload;
            const video = { url };
            return { ids: [id, ...ids], metadata: { ...metadata, [id]: video } };
        }
        case VIDEO_ACTION_METADATA_RECEIVED: {
            const { id, title, thumbnail } = action.payload;
            const video = { ...metadata[id], title, thumbnail };
            return { ids, metadata: { ...metadata, [id]: video } };
        }
        case VIDEO_ACTION_DOWNLOAD_STARTED:
        case VIDEO_ACTION_DOWNLOAD_PROGRESS:
        case VIDEO_ACTION_DOWNLOAD_COMPLETE:
            return state;
        default:
            return state;
    }
};
