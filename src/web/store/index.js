import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import ipcMiddleware from './middleware.js/ipcMiddleware';

export default createStore(reducers, {}, applyMiddleware(ipcMiddleware, thunk));
