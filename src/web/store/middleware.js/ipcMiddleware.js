import { ipcRenderer, remote } from 'electron';
import {
    SERVER_DO_VIDEO_DOWNLOAD,
    SERVER_VIDEO_ADDED,
    SERVER_VIDEO_METADATA_RECEIVED,
    SERVER_VIDEO_DOWNLOAD_STARTED,
    SERVER_VIDEO_DOWNLOAD_PROGRESS,
    SERVER_VIDEO_DOWNLOAD_COMPLETED,
    SERVER_VIDEO_DOWNLOAD_ERROR,
    SERVER_CHANGE_SAVE_FOLDER,
    SERVER_SAVE_FOLDER_CHANGED
} from '@shared/events';
import {
    DOWNLOAD_VIDEO,
    CHANGE_SAVE_FOLDER,
    MAXIMIZE_WINDOW,
    MINIMIZE_WINDOW,
    UNMAXIMIZE_WINDOW,
    CLOSE_WINDOW
} from '../../actions/action_types';
import * as IPCActions from '../../actions/ipc';

const IPC_EVENT_ACTIONS = {
    [SERVER_VIDEO_ADDED]: IPCActions.videoAdded,
    [SERVER_VIDEO_METADATA_RECEIVED]: IPCActions.metadataReceived,
    [SERVER_VIDEO_DOWNLOAD_STARTED]: IPCActions.downloadStarted,
    [SERVER_VIDEO_DOWNLOAD_PROGRESS]: IPCActions.downloadProgress,
    [SERVER_VIDEO_DOWNLOAD_COMPLETED]: IPCActions.downloadCompleted,
    [SERVER_VIDEO_DOWNLOAD_ERROR]: IPCActions.downloadError,
    [SERVER_SAVE_FOLDER_CHANGED]: IPCActions.saveFolderChanged
};

export default store => {
    // Assign each ipc event a dispatchable action
    for (const evt in IPC_EVENT_ACTIONS) {
        ipcRenderer.on(evt, (_, data) => store.dispatch(IPC_EVENT_ACTIONS[evt](data)));
    }
    // Assign each window event a dispatchable action
    getWindow().on('resize', () => {
        console.log('RESIZED');
        const isMaximized = getWindow().isMaximized();

        if (isMaximized === store.getState().window.maximized) return;
        store.dispatch(IPCActions.windowStateChanged(isMaximized));
    });

    return next => action => handleIPCAction(action) || next(action);
};

function handleIPCAction(action) {
    switch (action.type) {
        case DOWNLOAD_VIDEO:
            ipcRenderer.send(SERVER_DO_VIDEO_DOWNLOAD, action.payload);
            break;
        case CHANGE_SAVE_FOLDER:
            ipcRenderer.send(SERVER_CHANGE_SAVE_FOLDER, action.payload);
            break;
        case MAXIMIZE_WINDOW:
            getWindow().maximize(true);
            break;
        case MINIMIZE_WINDOW:
            getWindow().minimize();
            break;
        case UNMAXIMIZE_WINDOW:
            getWindow().unmaximize();
            break;
        case CLOSE_WINDOW:
            getWindow().close();
            break;
        default: return false;
    }

    return true;
}

// instead of getCurrentWindow due to waiting to show browser window until it's loaded
const getWindow = () => remote.BrowserWindow.getAllWindows()[0];
