import {
    getSaveFolder
} from '@shared/config';
import {
    CONFIG_ACTION_SAVE_FOLDER_CHANGED
} from '../actions/action_types';

const DEFAULT_STATE = {
    saveFolder: getSaveFolder()
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case CONFIG_ACTION_SAVE_FOLDER_CHANGED: {
            return { ...state, saveFolder: action.payload };
        }
        default:
            return state;
    }
};
