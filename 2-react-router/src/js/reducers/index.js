import { combineReducers } from 'redux';
import fetchApplicationReducer from './fetchApplication';

const rootReducer = combineReducers({
  fetchApplication: fetchApplicationReducer
});

export default rootReducer;