import React from "react";

import FieldDisplay from "../components/FieldDisplay"

var parseFieldsDivOne = [];
var fieldPathDict = {};

// const filedsetName = "Application_FieldSet_One";    //this.props.fieldset;
// const objectName   = "genesis__Applications__c";  //this.props.objectApi;

// var filedsetName = "mandatoryFieldSetAccount";    //this.props.fieldset;
// var objectName   = "Account";  //this.props.objectApi;

var filedsetName;
var objectName;
var recordId;

var hasOwnProperty = Object.prototype.hasOwnProperty;



export default class Fieldset  extends React.Component {



	constructor(props) {
	    super(props);
	    this.fetchFieldset = this.fetchFieldset.bind(this);
	    this.fieldBinding = this.fieldBinding.bind(this);
	    this.apexTypeToHtmlType = this.apexTypeToHtmlType.bind(this);
	    this.initFieldPathValue = this.initFieldPathValue.bind(this);
	    this.isEmpty = this.isEmpty.bind(this);


	    this.state = {filedsetName: '',objectName:'',parseFieldsDivOne:'', fieldPathDict:''};

	    const queryParams = this.props.params;
	    console.log('queryParams ',queryParams);  //undefined

	    // console.log(' queryParams ,filedsetName, objectName ',queryParams,queryParams.filedsetName ,queryParams.objectName);


	    if(queryParams !== undefined && queryParams.filedsetName !== undefined && queryParams.objectName !== undefined) {
	    	console.log('inside empty query params...objectName ',this.props.objectName);

	    	console.log('inside not empty queryParams ',queryParams,queryParams.filedsetName ,queryParams.objectName);

	    	objectName   = queryParams.objectName;
		    filedsetName = queryParams.filedsetName;
		    if(queryParams.recordId !== undefined) {
		    	recordId     = queryParams.recordId;

		    }
	    	
	    	

	    } else {
	    	if(this.props.objectName !== undefined) {
	    		console.log('this.props.objectName !== undefined',this.props);
		    	objectName   = this.props.objectName;
			    filedsetName = this.props.filedsetName;
			    recordId     = this.props.recordId;
	    	} else {
	    		console.log('this.props.objectName === undefined',this.props);

	    		objectName   = 'genesis__Applications__c';
			    filedsetName = 'Application_FieldSet_One';
			    recordId     = 'a3O41000000HuEeEAK';
	    	}

	    }

		console.log('objectName, filedsetName, recordId ',objectName, filedsetName, recordId);

	    

	    
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

	fetchFieldset() {
	  	
	  	var vm = this;

	  	console.log('filedsetName, objectName  ',filedsetName, objectName);

	  	console.log('recordId ',recordId);

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

	            		vm.fieldBinding(vm, filedsetName, objectName, fieldsetList, picklistResultByFieldName, referenceResultByFieldName);
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

	            		vm.fieldBinding(vm, filedsetName, objectName, fieldsetList, picklistResultByFieldName, referenceResultByFieldName);
	            	});


	            });



		  	});
		}

	}

	  fieldBinding(vm, filedsetName, objectName, fieldsetList, picklistResultByFieldName, referenceResultByFieldName) {
	  	var idNameMapListForDisplayingReferenceName = [];
	  	
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
                        fields[key] = vm.apexTypeToHtmlType(fields[key]);
                        fieldModel[key] = fields[key];
                    }

                  
	  		}
	  		parseFieldsDivOne.push(fieldModel);


	  	});
	  		console.log('parseFieldsDivOne ',parseFieldsDivOne);
	  		this.initFieldPathValue(parseFieldsDivOne);


	}

	initFieldPathValue(parseFields) {
	  	// fieldPathDict = {}
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


	  	// this.forceUpdate()
	  	this.setState({filedsetName: filedsetName,objectName:objectName,parseFieldsDivOne:parseFieldsDivOne, fieldPathDict:fieldPathDict});

	}

	apexTypeToHtmlType(type) {
                
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

	componentDidMount() {
	    this.fetchFieldset();
	}

	componentWillUnmount() {
	    // clearInterval(this.timerID);
	   	 parseFieldsDivOne = [];
		 fieldPathDict = {};
	}


	render() {

		return (
				<div>
					<FieldDisplay appList = {parseFieldsDivOne} fieldPathDict={fieldPathDict} objectName={objectName} 
					 fieldset={filedsetName}/>
				</div>
			);
	}
}