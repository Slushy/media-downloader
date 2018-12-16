import {
    VIDEO_ACTION_DOWNLOAD_STARTED,
    VIDEO_ACTION_DOWNLOAD_PROGRESS,
    VIDEO_ACTION_DOWNLOAD_COMPLETE
} from '../actions/action_types';

const DEFAULT_PROGRESS = {
    currentBytes: undefined,
    totalBytes: undefined,
    started: false,
    finished: false
};

const DEFAULT_STATE = {}; // [id]: { ...DEFAULT_PROGRESS }

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case VIDEO_ACTION_DOWNLOAD_STARTED: {
            const { id } = action.payload;
            const progress = { ...DEFAULT_PROGRESS, started: true };
            return { ...state, [id]: progress };
        }
        case VIDEO_ACTION_DOWNLOAD_PROGRESS: {
            const { id, currentBytes, totalBytes } = action.payload;
            const progress = { ...state[id], currentBytes, totalBytes };
            return { ...state, [id]: progress };
        }
        case VIDEO_ACTION_DOWNLOAD_COMPLETE: {
            const { id } = action.payload;
            const progress = { ...state[id], finished: true };
            return { ...state, [id]: progress };
        }
        default:
            return state;
    }
};
