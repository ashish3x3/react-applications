

import { REQUEST_APPSLIST, RECEIVED_APPSLIST, RECEIVED_APPSLIST_VALUE, LOG_APP_SELECT, USER_INPUT_FIELDSET, RECEIVED_FIELDSET,FIELDSET_FAILED, FIELDSET_SAVED } from '../actions';




export function recAppsList(appList) {
  return{
    type: RECEIVED_APPSLIST,
    appList: appList
  }
}


export function logChange(val) {

	return dispatch => {
	    console.log("Selected: " );
	    console.log(val);
	  	console.log('val.value',val.value);
	  	const link = '/fieldset/genesis__Applications__c/Application_FieldSet_One/';
	  	const recordId = val.value;
	  	dispatch({type: RECEIVED_APPSLIST_VALUE, data:val.value});
	  	// dispatch(push('/yodlee'));
	}
  

}

export function requestApplicationList() {

	return dispatch => {

		console.log('called requestApplicationList inside action.index.js');

	    ReactAccountController.fetchApplicationOnAccountId(function(result, event) {

	      console.log('result fetchAccountForSelect ',result)

	      var appDictList = [];
	      var map = {}
	      var applications    = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));
	      applications.forEach(function(app) {
	      	map ={}
	      	map['value'] = app.Id;
	      	map['label'] = app.Name;

	      	//create array of map with value and label
	      	appDictList.push(map);
	      })

	      console.log('appDictList ',appDictList);

	  	  const data = appDictList;


	  	  dispatch({type: RECEIVED_APPSLIST,
    				appList: data})



	    },{escape:false});

	}
    
}



