

import { ActionTypes } from '../actions';


const initialState =  {
  username  : '',
  password  : '',
  error     : '',
  height    : '700',
  width     : '900',
  url       : 'https://secure.na1.echosign.com/public/apiesign?pid=CBFCIBAA3AAABLblqZhApqVXZSUJcsUlDw778fQRBKqTqn8J5nmIbyDi6SU4SOGqDBjooJbGb0K77M_rKyYo*',
  showUrl   : false
};
//intervalId:''

export default function yodleeReducer(state = initialState, action) {

  switch (action.type) {
  	case ActionTypes.REQUEST_YODLEE_URL:
  		console.log('yodleeReducer REQUEST_YODLEE_URL inside state before ',state);
  		console.log('yodleeReducer REQUEST_YODLEE_URL data ',action);


      	return {
        	...state
      	};

    case ActionTypes.RECEIVED_YODLEE_URL:
  		console.log('yodleeReducer RECEIVED_YODLEE_URL inside state before ',state);
  		console.log('yodleeReducer RECEIVED_YODLEE_URL data ',action);


      	return {
        	...state, url: action.data
      	};

    case ActionTypes.RECEIVED_YODLEE_URL_ERROR:
  		console.log('yodleeReducer RECEIVED_YODLEE_URL_ERROR inside state before ',state);
  		console.log('yodleeReducer RECEIVED_YODLEE_URL_ERROR data ',action);
	 	 return {
	    	...state, error:action.data
  		};

    case ActionTypes.USER_INPUT_YODLEE_FORM:
      console.log('yodleeReducer USER_INPUT_YODLEE_FORM inside state before ',state);
      console.log('yodleeReducer USER_INPUT_YODLEE_FORM data ',action);


        return {
          ...state, [action.data.name]: action.data.value
        };

    case ActionTypes.LOGIN_SUCCESS:
      console.log('yodleeReducer LOGIN_SUCCESS inside state before ',state);
      console.log('yodleeReducer LOGIN_SUCCESS data ',action);


        return {
          ...state
        };

    case ActionTypes.LOGIN_FAILED:
      console.log('yodleeReducer LOGIN_FAILED inside state before ',state);
      console.log('yodleeReducer LOGIN_FAILED data ',action);
     return {
        ...state, error:action.data
      };

    case ActionTypes.SET_SHOW_URL:
      console.log('yodleeReducer LOGIN_FAILED inside state before ',state);
      console.log('yodleeReducer LOGIN_FAILED data ',action);
     return {
        ...state, showUrl:action.data
      };

    

    default:
      return state;
  }
}