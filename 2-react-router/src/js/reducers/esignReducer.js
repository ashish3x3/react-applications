

import { ActionTypes } from '../actions';


const initialState =  {
  url:'https://secure.na1.echosign.com/public/apiesign?pid=CBFCIBAA3AAABLblqZhApqVXZSUJcsUlDw778fQRBKqTqn8J5nmIbyDi6SU4SOGqDBjooJbGb0K77M_rKyYo*',
  height:'700',
  width:'900'
};


export default function esignReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_ESIGN_URL:
  		console.log('fetchApplicationReducer REQUEST_APPSLIST inside state before ',state);
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE applicationList ',action.appList);


      	return {
        	...state, applicationList: action.appList
      	};

  case ActionTypes.RECEIVED_ESIGN_URL:
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST inside state before ',state);
  		console.log('fetchApplicationReducer RECEIVED_APPSLIST_VALUE applicationList ',action.appList);
	 	 return {
	    	...state, applicationList: action.appList
  		};

  case ActionTypes.RECEIVED_ESIGN_URL_ERROR:
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