// import { REQUEST_APPSLIST, RECEIVED_APPSLIST, RECEIVED_APPSLIST_VALUE, LOG_APP_SELECT, USER_INPUT_FIELDSET, RECEIVED_FIELDSET,FIELDSET_FAILED, FIELDSET_SAVED } from '../actions';

import { ActionTypes } from '../actions';


const initialState =  {
  filedsetName      : '',
  objectName        : '',
  recordId          : '',
  appList           : [],
  fieldPathDict     : {},
  fieldPathName     : '',
  fieldPathValue    : ''
};

export default function fieldDisplayReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USER_INPUT_FIELDSET:
  		console.log('fieldDisplayReducer USER_INPUT_FIELDSET inside state before ',state);
  		console.log('fieldDisplayReducer USER_INPUT_FIELDSET fieldPathName,fieldPathValue ',action.fieldPathDict);


      	return {
        	 ...state, fieldPathDict: action.fieldPathDict
      	};

    case ActionTypes.RECEIVED_FIELDSET:
      console.log('fieldDisplayReducer RECEIVED_FIELDSET inside state before ',state);
      console.log('fieldDisplayReducer RECEIVED_FIELDSET action.objectName ',action.objectName);
      console.log('fieldDisplayReducer RECEIVED_FIELDSET filedsetName ',action.filedsetName);
      console.log('fieldDisplayReducer RECEIVED_FIELDSET parseFieldsDivOne ',action.parseFieldsDivOne);
      console.log('fieldDisplayReducer RECEIVED_FIELDSET fieldPathDict ',action.fieldPathDict);

       return {
          ...state, objectName: action.objectName, filedsetName:action.filedsetName, recordId:action.recordId, appList:action.parseFieldsDivOne, fieldPathDict:action.fieldPathDict
        };

    case ActionTypes.FIELDSET_SAVED:
      console.log('fieldDisplayReducer FIELDSET_SAVED inside state before ',state);
      console.log('fieldDisplayReducer FIELDSET_SAVED newId ',action.newId);


        return {
           ...state, recordId: action.newId
        };

    default:
      return state;
  }
}