import { combineReducers } from 'redux';
import fetchApplicationReducer from './fetchApplication';
import fieldsetReducer from './fieldsetReducer';
import fieldDisplayReducer from './fieldDisplayReducer';
import loginReducer from './loginReducer';
import esignReducer from './esignReducer';





const rootReducer = combineReducers({
  fetchApplication : fetchApplicationReducer,
  fieldset         : fieldsetReducer,
  fieldDisplay     : fieldDisplayReducer,
  login            : loginReducer,
  esign            : esignReducer
});

export default rootReducer;