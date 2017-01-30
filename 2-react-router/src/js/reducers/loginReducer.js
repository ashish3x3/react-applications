import { REQUEST_APPSLIST, RECEIVED_APPSLIST, RECEIVED_APPSLIST_VALUE, LOG_APP_SELECT, USER_INPUT_FIELDSET, RECEIVED_FIELDSET,FIELDSET_FAILED, FIELDSET_SAVED, LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, USER_INPUT_LOGIN_FORM } from '../actions';

const initialState =  {
  username  : '',
  password : '',
  error     : ''
};

export default function loginReducer(state = initialState, action) {

  switch (action.type) {
  	case LOGIN_ATTEMPT:
  		console.log('loginReducer LOGIN_ATTEMPT inside state before ',state);
  		console.log('loginReducer LOGIN_ATTEMPT data ',action);


      	return {
        	...state
      	};

    case LOGIN_SUCCESS:
  		console.log('loginReducer LOGIN_SUCCESS inside state before ',state);
  		console.log('loginReducer LOGIN_SUCCESS data ',action);


      	return {
        	...state
      	};

  	case LOGIN_FAILED:
  		console.log('loginReducer LOGIN_FAILED inside state before ',state);
  		console.log('loginReducer LOGIN_FAILED data ',action);
	 	 return {
	    	...state, error:action.data
  		};

  	case USER_INPUT_LOGIN_FORM:
  		console.log('loginReducer USER_INPUT_LOGIN_FORM inside state before ',state);
  		console.log('loginReducer USER_INPUT_LOGIN_FORM data ',action);
	 	 return {
	    	...state, [action.data.name]: action.data.value
  		};

    default:
      return state;
  }
}