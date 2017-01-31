

import { ActionTypes } from '../actions';


export function getYodleeLink(username, password) {

	return dispatch => {
		var yodleeUrl ;
			// var username = '';    //sbMemvikas21@cli.com4
			// var password = '';    //asdfgCwerdr34#

	  	ReactAccountController.getYodleeUrl(username, password,function(response, event) {
		        if(event.status) {
		                console.log('response yodlee url = ',response);
		                
		                yodleeUrl = 'https://na35.salesforce.com'+response;
		                console.log('yodleeUrl ',yodleeUrl);
		                // showUrl = true;

		                if(ValidURL(yodleeUrl)) {
		                	dispatch({	type: ActionTypes.SET_SHOW_URL,
			    				data: true
			    			});

			    			dispatch({	type: ActionTypes.RECEIVED_YODLEE_URL,
			    				data: yodleeUrl
			    			});

		                } else {
		                	dispatch({	type: ActionTypes.RECEIVED_YODLEE_URL_ERROR,
			    				data: response
			    			});
		                }

		        } else {
		            dispatch({	type: ActionTypes.RECEIVED_YODLEE_URL_ERROR,
		    				data: response
		    			});
		        }   
		        
		        
		});
	} 
}

export function handleChangeYodlee(dict) {

		return dispatch => {

			console.log('dict ',dict, dict.name, dict.value);

			dispatch({	type: ActionTypes.USER_INPUT_YODLEE_FORM,
		    				data: dict
		    			});
		}

 }


 function ValidURL(str) {
  var pattern = new RegExp('^(https?:\\//\\//)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\d+)?(\\//[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}
	

  		