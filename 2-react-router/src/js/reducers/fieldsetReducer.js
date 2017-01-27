
import { FETCH_FIELDSET, RECEIVED_FIELDSET, USER_INPUT_FIELDSET,FIELDSET_FAILED, FIELDSET_SAVED } from '../actions';



const initialState =  {
  filedsetName: '',
  objectName:'',
  recordId:'',
  parseFieldsDivOne:[], 
  fieldPathDict:{}
};

export default function fieldsetReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FIELDSET:
  		console.log('fieldsetReducer FETCH_FIELDSET inside state before ',state);
  		console.log('fieldsetReducer FETCH_FIELDSET applicationList ',action.appList);


      return {
        	...state, applicationList: action.appList
      };

    case USER_INPUT_FIELDSET:
      console.log('fieldsetReducer USER_INPUT_FIELDSET inside state before ',state);
      console.log('fieldsetReducer USER_INPUT_FIELDSET fieldPathName,fieldPathValue ',action.fieldPathDict);


        return {
           ...state, fieldPathDict: action.fieldPathDict
        };

    case RECEIVED_FIELDSET:
  		console.log('fieldsetReducer RECEIVED_FIELDSET inside state before ',state);
  		console.log('fieldsetReducer RECEIVED_FIELDSET action.objectName ',action.objectName);
      console.log('fieldsetReducer RECEIVED_FIELDSET filedsetName ',action.filedsetName);
      console.log('fieldsetReducer RECEIVED_FIELDSET parseFieldsDivOne ',action.parseFieldsDivOne);
      console.log('fieldsetReducer RECEIVED_FIELDSET fieldPathDict ',action.fieldPathDict);



	 	   return {
	    	  ...state, objectName: action.objectName, filedsetName:action.filedsetName, parseFieldsDivOne:action.parseFieldsDivOne, fieldPathDict:action.fieldPathDict
  		  };

    case FIELDSET_SAVED:
      console.log('fieldsetReducer USER_INPUT_FIELDSET inside state before ',state);
      console.log('fieldsetReducer USER_INPUT_FIELDSET fieldPathName,fieldPathValue ',action.newId);


        return {
           ...state, recordId: action.newId
        };

    case FIELDSET_FAILED:
      console.log('fieldsetReducer USER_INPUT_FIELDSET inside state before ',state);
      console.log('fieldsetReducer USER_INPUT_FIELDSET fieldPathName,fieldPathValue ',action.error);


        return state;

    default:
      return state;
  }
}