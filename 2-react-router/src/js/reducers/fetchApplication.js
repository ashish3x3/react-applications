import { REQUEST_APPSLIST, RECEIVED_APPSLIST, RECEIVED_APPSLIST_VALUE, LOG_APP_SELECT } from '../actions';

const initialState =  {
  applicationList: [],
  value : ''
};

export default function fetchApplicationReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_APPSLIST:
  		console.log('fetchApplicationReducer REQUEST_APPSLIST inside state before ',state);
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE applicationList ',action.appList);


      	return {
        	...state, applicationList: action.appList
      	};

  case RECEIVED_APPSLIST:
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST inside state before ',state);
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE applicationList ',action.appList);
	 	 return {
	    	...state, applicationList: action.appList
  		};

  case RECEIVED_APPSLIST_VALUE:
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE inside state before ',state);
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE value ',action.data);

	  	return {
	    	...state, value: action.data
  		};

  case LOG_APP_SELECT:
	  	return {
	    	...state, value: action.data
  		};
    default:
      return state;
  }
}