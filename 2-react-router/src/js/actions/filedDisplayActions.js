
// import { REQUEST_APPSLIST, RECEIVED_APPSLIST, RECEIVED_APPSLIST_VALUE, LOG_APP_SELECT, USER_INPUT_FIELDSET, RECEIVED_FIELDSET,FIELDSET_FAILED, FIELDSET_SAVED } from '../actions';

import { ActionTypes } from '../actions';




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




	    dispatch({	type: ActionTypes.USER_INPUT_FIELDSET,
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
              dispatch({type: ActionTypes.FIELDSET_SAVED, newId:response})

            } else {
              res = false;
              dispatch({type: ActionTypes.FIELDSET_FAILED, error:response})

            }


      });


	}


  }




