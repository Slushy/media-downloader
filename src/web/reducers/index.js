import { combineReducers } from 'redux';
import config from './config';
import videos from './videos';
import metadata from './metadata';
import progress from './progress';

export default combineReducers({ config, videos, metadata, progress });
