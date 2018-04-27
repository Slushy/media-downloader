import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './reducers';
import VideoSelect from './components/video_select';

ReactDOM.render(
    <Provider store={store}>
        <VideoSelect />
    </Provider>,
    document.getElementById('root')
);
