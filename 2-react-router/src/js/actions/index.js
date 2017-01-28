import { Router, Route, IndexRoute, hashHistory, browserHistory  } from "react-router";
import { routerMiddleware, push } from 'react-router-redux';

import { fetchFieldset } from './fieldsetActions';
import { handleClearForm, handleUserInput, pause, handleFormSubmit } from './filedDisplayActions';
import { recAppsList, logChange, requestApplicationList } from './fetchApplicationsActions';





export const REQUEST_APPSLIST  = 'REQUEST_APPSLIST';
export const RECEIVED_APPSLIST = 'RECEIVED_APPSLIST';
export const RECEIVED_APPSLIST_VALUE  = 'RECEIVED_APPSLIST_VALUE';
export const LOG_APP_SELECT  = 'LOG_APP_SELECT';

export const FETCH_FIELDSET  = 'FETCH_FIELDSET';
export const RECEIVED_FIELDSET  = 'RECEIVED_FIELDSET';

export const USER_INPUT_FIELDSET  = 'USER_INPUT_FIELDSET';

export const FIELDSET_SAVED  = 'FIELDSET_SAVED';
export const FIELDSET_FAILED  = 'FIELDSET_FAILED';



export { fetchFieldset };
export {  handleClearForm, handleUserInput, pause, handleFormSubmit };
export {  recAppsList, logChange, requestApplicationList };







