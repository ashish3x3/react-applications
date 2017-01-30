import { combineReducers } from 'redux';
import fetchApplicationReducer from './fetchApplication';
import fieldsetReducer from './fieldsetReducer';
import fieldDisplayReducer from './fieldDisplayReducer';
import loginReducer from './loginReducer';




const rootReducer = combineReducers({
  fetchApplication : fetchApplicationReducer,
  fieldset         : fieldsetReducer,
  fieldDisplay     : fieldDisplayReducer,
  login            : loginReducer
});

export default rootReducer;