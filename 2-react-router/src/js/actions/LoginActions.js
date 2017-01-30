
// import { REQUEST_APPSLIST, RECEIVED_APPSLIST, RECEIVED_APPSLIST_VALUE, LOG_APP_SELECT, USER_INPUT_FIELDSET, RECEIVED_FIELDSET,FIELDSET_FAILED, FIELDSET_SAVED, LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_ATTEMPT, USER_INPUT_LOGIN_FORM } from '../actions';


import { ActionTypes } from '../actions';


export function onSubmit(username, password) {

	return dispatch => {
		console.log('username ',username);
		console.log('password ',password);

		dispatch({	type: ActionTypes.LOGIN_ATTEMPT,
	    			});

		ReactAccountController.RemoteLogin(username, password, function(response,
                                                                   event) {

			console.log('response ',response);
			if (response.indexOf('Login Error') === -1) {
            
            var textArea = document.createElement('textarea');
            textArea.innerHTML = response;
            const isLoginSuccessful =  textArea.value;
            console.log('isLoginSuccessful ',isLoginSuccessful);
            
            window.location = isLoginSuccessful;
            dispatch({	type: ActionTypes.LOGIN_SUCCESS,
	    			});
            
	        } else {
	             console.log('response error : ',response);
	             dispatch({	type: ActionTypes.LOGIN_FAILED,
	             			data : response
	    			});
	        }


		});
	}

}
export function handleChange(dict) {

	return dispatch => {

		console.log('dict ',dict, dict.name, dict.value);

		dispatch({	type: ActionTypes.USER_INPUT_LOGIN_FORM,
	    				data: dict
	    			});
	}

}
