import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import videos from './videos';

export default createStore(combineReducers({ videos }), {}, applyMiddleware(thunk));
