import { Router, Route, IndexRoute, hashHistory, browserHistory  } from "react-router";
import { routerMiddleware, push } from 'react-router-redux';

// import { fetchFieldset } from './fieldsetActions';



export const REQUEST_APPSLIST  = 'REQUEST_APPSLIST';
export const RECEIVED_APPSLIST = 'RECEIVED_APPSLIST';
export const RECEIVED_APPSLIST_VALUE  = 'RECEIVED_APPSLIST_VALUE';
export const LOG_APP_SELECT  = 'LOG_APP_SELECT';

export const FETCH_FIELDSET  = 'FETCH_FIELDSET';
export const RECEIVED_FIELDSET  = 'RECEIVED_FIELDSET';

export const USER_INPUT_FIELDSET  = 'USER_INPUT_FIELDSET';

export const FIELDSET_SAVED  = 'FIELDSET_SAVED';
export const FIELDSET_FAILED  = 'FIELDSET_FAILED';






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




function apexTypeToHtmlType(type) {
            
    	if(type == 'int') {
        	return 'number';
        } else if(type == 'currency') {
        	return 'number';
        } else if(type == 'string') {
        	return 'text';
        } else if(type == 'boolean') {
        	return 'checkbox';
        } else if(type == 'encryptedstring') {
        	return 'password';
        }
        
        return type;
}

function initFieldPathValue(parseFields) {
  	var fieldPathDict = {}
  	parseFields.map(function(item, index) {
  		console.log('item.type ',item.type);

  		if(item.type.toLowerCase() === 'date') {
  			const newDate = item.value.split(" ")[0];
  			
  			fieldPathDict[item.fieldPath] = newDate;

  		} else {
  			fieldPathDict[item.fieldPath] = item.value;

  		}
  		// if(item.type == 'reference') {
  		// 	fieldPathDict[item.fieldPath] = {};
  		// } else{
  		// 	fieldPathDict[item.fieldPath] = '';
  		// }
  		
  	});

  	return fieldPathDict;


  	// this.forceUpdate()
  	// this.setState({filedsetName: filedsetName,objectName:objectName,parseFieldsDivOne:parseFieldsDivOne, fieldPathDict:fieldPathDict});


}


function fieldBinding(filedsetName, objectName, fieldsetList, picklistResultByFieldName, referenceResultByFieldName) {
  	var idNameMapListForDisplayingReferenceName = [];
  	var parseFieldsDivOne = [];
  	
  	fieldsetList.map(function(fields, index){
  		var fieldModel = {};
  		fieldModel.objectName =  objectName;

  		for(var key in fields) {
  			if(key == 'type' && fields[key].toLowerCase() == 'picklist') {
                    fieldModel['picklistValues'] = picklistResultByFieldName[fields.fieldPath]; 
                    fieldModel[key] = fields[key].toLowerCase();
                         
                } else if(key == 'type' && fields[key].toLowerCase() == 'reference') {
                    var referenceValueList = [];
                    var refDataMap      = {};
                    for(var k in referenceResultByFieldName[fields.fieldPath]) {
                        refDataMap      = {};
                        refDataMap['Id'] = k; 
                        refDataMap['Name'] = referenceResultByFieldName[fields.fieldPath][k]; 
                        referenceValueList.push(refDataMap);
                        idNameMapListForDisplayingReferenceName.push(refDataMap);
                    }
                    
                    fieldModel['referenceListValues'] = referenceValueList;
                    fieldModel[key] = fields[key].toLowerCase();
                         
                } else {
                    fields[key] = apexTypeToHtmlType(fields[key]);
                    fieldModel[key] = fields[key];
                }

              
  		}
  		parseFieldsDivOne.push(fieldModel);


  	});
  		console.log('parseFieldsDivOne ',parseFieldsDivOne);
  		var fieldPathDict = initFieldPathValue(parseFieldsDivOne);

  		return {parseFieldsDivOne, fieldPathDict};


}


export function fetchFieldset(filedsetName, objectName, recordId) {

	return dispatch => {
	  	
		console.log('filedsetName, objectName  ',filedsetName, objectName);

		console.log('recordId ',recordId);

		var parseDivWithFieldeDict;



		if(recordId !== undefined) {
			console.log('inisde if not undefined recordId');
			ReactAccountController.getFieldSetInfoWithValue(filedsetName, objectName, recordId, function(result, event) {
	  		var fieldsetList = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));
	  		console.log('fieldsetList ',fieldsetList);

	  		var picklistFieldName = [];
	  		var referenceListFieldName = [];
	  		var picklistResultByFieldName = [];
	  		var referenceResultByFieldName = [];

	  		fieldsetList.map(function(fields, index){
	            console.log('index ',index,'+++++');
	            for(var key in fields) {
	            	console.log('fields.fieldPath ',fields.fieldPath);
	            	if(key == 'type' && fields[key].toLowerCase() == 'picklist') {
	                   //console.log('its a picklist');
	                   picklistFieldName.push(fields.fieldPath);
	                   
	               } else if(key == 'type' && fields[key].toLowerCase() == 'reference') {
	                   //console.log('its a reference');
	                   referenceListFieldName.push(fields.fieldPath);
	                   
	               }   
	            }
	        })

	        console.log('picklistFieldName ',picklistFieldName);
	        console.log('referenceListFieldName ',referenceListFieldName);

	        ReactAccountController.getPicklistValue(objectName, picklistFieldName, function(result, event) {
	        	picklistResultByFieldName = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));

	        	ReactAccountController.getReferenceFieldValues(objectName, referenceListFieldName, function(result, event) {
	        		referenceResultByFieldName = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));

	        	 parseDivWithFieldeDict = fieldBinding(filedsetName, objectName, fieldsetList, picklistResultByFieldName, referenceResultByFieldName);

	        	console.log('parseDivWithFieldeDict ',parseDivWithFieldeDict);

	        	dispatch({	type: RECEIVED_FIELDSET,
	    				objectName: objectName,
	    				filedsetName: filedsetName,
	    				recordId: recordId,
	    				parseFieldsDivOne: parseDivWithFieldeDict.parseFieldsDivOne,
	    				fieldPathDict: parseDivWithFieldeDict.fieldPathDict
	    			});
	        	});


	        });

		});
	  	} else {

		  	ReactAccountController.getFieldSetInfo(filedsetName, objectName, function(result, event) {
		  		var fieldsetList = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));
		  		console.log('fieldsetList ',fieldsetList);

		  		var picklistFieldName = [];
		  		var referenceListFieldName = [];
		  		var picklistResultByFieldName = [];
		  		var referenceResultByFieldName = [];

		  		fieldsetList.map(function(fields, index){
	                console.log('index ',index,'+++++');
	                for(var key in fields) {
	                	console.log('fields.fieldPath ',fields.fieldPath);
	                	if(key == 'type' && fields[key].toLowerCase() == 'picklist') {
	                       //console.log('its a picklist');
	                       picklistFieldName.push(fields.fieldPath);
	                       
	                   } else if(key == 'type' && fields[key].toLowerCase() == 'reference') {
	                       //console.log('its a reference');
	                       referenceListFieldName.push(fields.fieldPath);
	                       
	                   }   
	                }
	            })

	            console.log('picklistFieldName ',picklistFieldName);
	            console.log('referenceListFieldName ',referenceListFieldName);

	            ReactAccountController.getPicklistValue(objectName, picklistFieldName, function(result, event) {
	            	picklistResultByFieldName = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));

	            	ReactAccountController.getReferenceFieldValues(objectName, referenceListFieldName, function(result, event) {
	            		referenceResultByFieldName = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));

	            	 parseDivWithFieldeDict = fieldBinding(filedsetName, objectName, fieldsetList, picklistResultByFieldName, referenceResultByFieldName);
	        		console.log('parseDivWithFieldeDict ',parseDivWithFieldeDict);

	            	});


	            });



		  	});
		}

    }

}



// FieldDisplay Actions


  
 export function handleClearForm(e) {

    e.preventDefault();
    var default1 = this.props.fieldPathDict;

    var newState = Object.assign({}, this.state.fieldValue, {default1});
    this.setState({ fieldValue : this.props.fieldPathDict});
    // this.forceUpdate()

  }



export function handleUserInput(fieldPathName,fieldPathValue) {

	return (dispatch, getState) => {

	    console.log('fieldPathName fieldPathValue',fieldPathName,fieldPathValue);

	    let { fieldPathDict } =  getState().fieldDisplay;
	    console.log(' fieldPathDict ',fieldPathDict);
	    console.log(' getState ',getState());

	    var newFieldPathDict = Object.assign({}, fieldPathDict, {[fieldPathName]: fieldPathValue});




	    dispatch({	type: USER_INPUT_FIELDSET,
    				fieldPathDict: newFieldPathDict
    			});
	    
	}

  }


export function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
  }

export function handleFormSubmit(e) {

	return (dispatch, getState) => {

	    e.preventDefault();


	    console.log('Send this in a POST request: e ', e)

	    const formPayload = {
	      fieldValue: getState().fieldDisplay.fieldPathDict
	    };

	    const {objectName, filedsetName, recordId } = getState().fieldDisplay;

	    var recordIdToUpdate = recordId;

	    console.log('objectName, filedsetName, recordId ',objectName, filedsetName, recordId);

	    var objectFieldPathNameToFieldPathValueMap = {};

	    if(recordIdToUpdate === undefined || recordIdToUpdate === '') {
	    	recordIdToUpdate = null;

	    }
	    var formData = formPayload.fieldValue;
	    Object.keys(formData).map(function(key, keyIndex) {
	          objectFieldPathNameToFieldPathValueMap[key] = formData[key];
	    });

	    console.log('objectFieldPathNameToFieldPathValueMap ',objectFieldPathNameToFieldPathValueMap);

	    var resToReturn;

	    // asyncOperation(objectFieldPathNameToFieldPathValueMap,recordIdToUpdate).then(value => {console.log('value # succ',value);resToReturn = true;}).catch(error => {console.log('value ## rej ',value);resToReturn = false;});

	    // asyncOperation(objectFieldPathNameToFieldPathValueMap,recordIdToUpdate);
    	let res;

	    ReactAccountController.insertObject(objectName,
                                        	filedsetName, 
	                                        objectFieldPathNameToFieldPathValueMap,
	                                        recordIdToUpdate,
	                                        function(response,
	                                          		 event) {

            console.log('response,event insertObject ',response,event );
            if(event.status) {
              res = true;
              dispatch({type: FIELDSET_SAVED, newId:response})

            } else {
              res = false;
              dispatch({type: FIELDSET_FAILED, error:response})

            }


      });


	}


  }










