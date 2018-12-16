import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import ipcMiddleware from './middleware.js/ipcMiddleware';
import reducers from '../reducers';

export default createStore(reducers, {}, applyMiddleware(
    createLogger({ collapsed: true }),
    ipcMiddleware,
    thunk
));
