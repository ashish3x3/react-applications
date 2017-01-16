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

	    if(this.isEmpty(queryParams)) {
	    	objectName   = this.props.objectName;
		    filedsetName = this.props.filedsetName;
		    recordId     = this.props.recordId;

	    } else {
	    	objectName   = queryParams.object;
		    filedsetName = queryParams.fieldset;
		    if(queryParams.recordId !== undefined) {
		    	recordId     = queryParams.recordId;

		    }
	    }
	    

	    
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
                        //console.log('picklistFieldName ',$scope.picklistResultByFieldName);
                        //console.log('its a picklist AFTER REMOTING','fields.fieldPath ',fields.fieldPath,'VALUE =',$scope.picklistResultByFieldName[fields.fieldPath]);
                        fieldModel['picklistValues'] = picklistResultByFieldName[fields.fieldPath]; 
                        fieldModel[key] = fields[key].toLowerCase();
                             
                    } else if(key == 'type' && fields[key].toLowerCase() == 'reference') {
                        //console.log('picklistFieldName ',referenceResultByFieldName);
                        //console.log('its a reference AFTER REMOTING','fields.fieldPath ',fields.fieldPath,'VALUE =',referenceResultByFieldName[fields.fieldPath]);
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
	  	var recId = recordId;
	  	console.log('recID ',recId,recordId);
	  	parseFields.map(function(item, index) {
	  		// fieldPathDict[item.fieldPath] = item.value;
	  		if(recId !== undefined) {
	  			console.log('recordId not == undefined ', recordId);
	  			if(item.type == 'reference') {
	  				console.log('item.type == reference' , item.type );

		  			fieldPathDict[item.fieldPath] = {Id:item.value, label:item.label};
		  		} else{
	  				console.log('item.type not == reference' , item.type );

		  			fieldPathDict[item.fieldPath] = item.value;
		  		}
	  			console.log('rfieldPathDict after ref val update ', fieldPathDict);

	  		} else {
	  			if(item.type == 'reference') {
	  				fieldPathDict[item.fieldPath] = {Id:'', label:''};
		  		} else{
		  			fieldPathDict[item.fieldPath] = '';
		  		}
	  		}
	  		
	  		
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
	    // alert('components did mount')
	    this.fetchFieldset();
	    // this.timerID = setInterval(
	    //   () => this.fetchAccount(),
	    //   1000
	    // );
	    // this.fetchAccount();
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