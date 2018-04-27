import { DOWNLOAD_VIDEO } from '../actions/action_types';

export default (state = {}, action) => {
    console.log(`action type: ${action.type}`);
    switch (action.type) {
        case DOWNLOAD_VIDEO:
            console.log(`The url to download is ${action.payload}`);
            return state;
        default:
            return state;
    }
};
