import {
    VIDEO_ACTION_ADDED,
    REMOVE_VIDEO
} from '../actions/action_types';

const DEFAULT_STATE = []; // [ id1, id2, ... ]

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case VIDEO_ACTION_ADDED: {
            const { id } = action.payload;
            return [id, ...state];
        }
        case REMOVE_VIDEO: {
            return state.filter(id => id != action.payload);
        }
        default:
            return state;
    }
};
