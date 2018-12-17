import {
    VIDEO_ACTION_ADDED,
    VIDEO_ACTION_METADATA_RECEIVED,
    REMOVE_VIDEO
} from '../actions/action_types';

const DEFAULT_STATE = {}; // [id]: { url, title, thumbnail }

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case VIDEO_ACTION_ADDED: {
            const { id, url } = action.payload;
            const video = { url };
            return { ...state, [id]: video };
        }
        case VIDEO_ACTION_METADATA_RECEIVED: {
            const { id, title, thumbnail, time, size } = action.payload;
            const video = { ...state[id], title, thumbnail, time, size };
            return { ...state, [id]: video };
        }
        case REMOVE_VIDEO: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
};
