
import { FETCH_FIELDSET, RECEIVED_FIELDSET } from '../actions';



const initialState =  {
  filedsetName: '',
  objectName:'',
  parseFieldsDivOne:'', 
  fieldPathDict:''
};

export default function fieldsetReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FIELDSET:
  		console.log('fieldsetReducer FETCH_FIELDSET inside state before ',state);
  		console.log('fieldsetReducer FETCH_FIELDSET applicationList ',action.appList);


      return {
        	...state, applicationList: action.appList
      };

  case RECEIVED_FIELDSET:
  		console.log('fieldsetReducer RECEIVED_FIELDSET inside state before ',state);
  		console.log('fieldsetReducer RECEIVED_FIELDSET applicationList ',action.appList);


	 	   return {
	    	  ...state, applicationList: action.appList
  		  };

    default:
      return state;
  }
}