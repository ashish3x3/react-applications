import React from "react";
import { connect } from 'react-redux';


import FieldDisplay from "../components/FieldDisplay"


import * as Actions from '../actions';



var parseFieldsDivOne = [];
var fieldPathDict = {};

var filedsetName;
var objectName;
var recordId;

var hasOwnProperty = Object.prototype.hasOwnProperty;



class Fieldset  extends React.Component {

	constructor(props) {
	    super(props);
	    this.isEmpty = this.isEmpty.bind(this);

	 }


	isEmpty(obj) {

	    if (obj == null) return true;

	    if (obj.length > 0)    return false;
	    if (obj.length === 0)  return true;

	    if (typeof obj !== "object") return true;

	    for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) return false;
	    }

	    return true;
	}

	componentDidMount() {
		var objectName,filedsetName,recordId;


	    if(this.props.objectName === undefined && this.props.fieldset === undefined) {
	    	objectName   = 'genesis__Applications__c';
		    filedsetName = 'Application_FieldSet_One';
		    recordId     = 'a3O41000000HuEeEAK';
	    } else {
	    	objectName   = this.props.objectName;
		    filedsetName = this.props.filedsetName;
	    }
	    console.log('this.props  #%%$', this.props);
	    console.log('objectName,filedsetName,recordId ',objectName,filedsetName,recordId);

	    this.props.fetchFieldset(filedsetName, objectName, recordId);
	    
	}

	componentWillUnmount() {
	   	 parseFieldsDivOne = [];
		 fieldPathDict = {};
	}


	render() {

		return (
				<div>

					<p> {this.props.objectName}  {this.props.filedsetName}</p>

					
					<FieldDisplay 	appList = {this.props.parseFieldsDivOne} 
									fieldPathDict={this.props.fieldPathDict} 
									objectName={this.props.objectName} 
            						fieldset={this.props.filedsetName}
            		/> 

				</div>
			);
	}
}

function mapStateToProps(state,ownProps) {
    console.log('mapStateToProps fieldset.js state ',state);
    console.log('mapStateToProps fieldset.js ownProps ',ownProps);

    // if(ownProps !== {})

    return {
      filedsetName      : ownProps.filedsetName,
      objectName        : ownProps.objectName,
      recordId          : state.fieldset.recordId,
      parseFieldsDivOne : state.fieldset.parseFieldsDivOne,
      fieldPathDict     : state.fieldset.fieldPathDict,


      
    };
  }

   function mapDispatchToProps(dispatch) {
    console.log('HOME.JS mapDispatchToProps home.js dispatch ',dispatch);

    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }


export default connect(mapStateToProps, Actions)(Fieldset);