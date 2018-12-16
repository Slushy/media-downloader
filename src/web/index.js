import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import VideoSelect from './components/video_select';
import VideoDownloads from './components/video_downloads';

ReactDOM.render(
    <Provider store={store}>
        <div className="app-container">
            <VideoSelect />
            <VideoDownloads />
        </div>
    </Provider>,
    document.getElementById('root')
);
