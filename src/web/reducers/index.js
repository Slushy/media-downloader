import { combineReducers } from 'redux';
import videos from './videos';
import metadata from './metadata';
import progress from './progress';

export default combineReducers({ videos, metadata, progress });
