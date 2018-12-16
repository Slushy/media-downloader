import { ipcRenderer } from 'electron';
import {
    SERVER_DO_VIDEO_DOWNLOAD,
    SERVER_VIDEO_ADDED,
    SERVER_VIDEO_METADATA_RECEIVED,
    SERVER_VIDEO_DOWNLOAD_STARTED,
    SERVER_VIDEO_DOWNLOAD_PROGRESS,
    SERVER_VIDEO_DOWNLOAD_COMPLETED,
    SERVER_VIDEO_DOWNLOAD_ERROR
} from '@shared/events';
import {
    DOWNLOAD_VIDEO
} from '../../actions/action_types';
import * as IPCActions from '../../actions/ipc';

const IPC_EVENT_ACTIONS = {
    [SERVER_VIDEO_ADDED]: IPCActions.videoAdded,
    [SERVER_VIDEO_METADATA_RECEIVED]: IPCActions.metadataReceived,
    [SERVER_VIDEO_DOWNLOAD_STARTED]: IPCActions.downloadStarted,
    [SERVER_VIDEO_DOWNLOAD_PROGRESS]: IPCActions.downloadProgress,
    [SERVER_VIDEO_DOWNLOAD_COMPLETED]: IPCActions.downloadCompleted,
    [SERVER_VIDEO_DOWNLOAD_ERROR]: IPCActions.downloadError
};

export default function (store) {
    // Assign each ipc event a dispatchable action
    for (const evt in IPC_EVENT_ACTIONS) {
        ipcRenderer.on(evt, (_, data) => store.dispatch(IPC_EVENT_ACTIONS[evt](data)));
    }

    return next => action => {
        if (action.type === DOWNLOAD_VIDEO) {
            ipcRenderer.send(SERVER_DO_VIDEO_DOWNLOAD, action.payload);
            return;
        }

        return next(action);
    };
}
