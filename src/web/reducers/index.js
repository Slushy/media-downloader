import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    state: (state = {}) => state
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));
