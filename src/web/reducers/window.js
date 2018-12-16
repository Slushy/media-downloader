import {
    WINDOW_STATE_CHANGED
} from '../actions/action_types';

const DEFAULT_STATE = {
    maximized: false
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case WINDOW_STATE_CHANGED: {
            return { ...state, maximized: action.payload };
        }
        default:
            return state;
    }
};
