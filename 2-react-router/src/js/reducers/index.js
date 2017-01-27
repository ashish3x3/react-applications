import { combineReducers } from 'redux';
import fetchApplicationReducer from './fetchApplication';
import fieldsetReducer from './fieldsetReducer';
import fieldDisplayReducer from './fieldDisplayReducer';



const rootReducer = combineReducers({
  fetchApplication : fetchApplicationReducer,
  fieldset         : fieldsetReducer,
  fieldDisplay     : fieldDisplayReducer
});

export default rootReducer;