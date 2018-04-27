import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ReduxStore from './reducers';
import VideoSelect from './components/video_select';

ReactDOM.render(
    <Provider store={ReduxStore}>
        <VideoSelect />
    </Provider>,
    document.getElementById('root')
);
