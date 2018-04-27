import { DOWNLOAD_VIDEO } from '../actions/action_types';

export default (urls = [], action) => {
    console.log(`action type: ${action.type}`);
    switch (action.type) {
        case DOWNLOAD_VIDEO:
            return [ action.payload, ...urls ];
        default:
            return urls;
    }
};
