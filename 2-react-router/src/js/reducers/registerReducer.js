
import { ActionTypes } from '../actions';


const initialState =  {
  fieldset  : 'mandatoryFieldSetAccount',
  objectName : 'Account'
};


export default function registerReducer(state = initialState, action) {

	switch (action.type) {
  	
	    default:
	      return state;
  }		

}
