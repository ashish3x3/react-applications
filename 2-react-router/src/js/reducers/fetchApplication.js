// import { REQUEST_APPSLIST, RECEIVED_APPSLIST, RECEIVED_APPSLIST_VALUE, LOG_APP_SELECT, USER_INPUT_FIELDSET, RECEIVED_FIELDSET,FIELDSET_FAILED, FIELDSET_SAVED } from '../actions';

import { ActionTypes } from '../actions';

console.log('ActionTypes ######### ',ActionTypes);


const initialState =  {
  applicationList: [],
  value : ''
};

export default function fetchApplicationReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_APPSLIST:
  		console.log('fetchApplicationReducer REQUEST_APPSLIST inside state before ',state);
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE applicationList ',action.appList);


      	return {
        	...state, applicationList: action.appList
      	};

  case ActionTypes.RECEIVED_APPSLIST:
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST inside state before ',state);
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE applicationList ',action.appList);
	 	 return {
	    	...state, applicationList: action.appList
  		};

  case ActionTypes.RECEIVED_APPSLIST_VALUE:
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE inside state before ',state);
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE value ',action.data);

	  	return {
	    	...state, value: action.data
  		};

  case ActionTypes.LOG_APP_SELECT:
	  	return {
	    	...state, value: action.data
  		};
    default:
      return state;
  }
}