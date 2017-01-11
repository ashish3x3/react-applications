import React from "react";

import FieldDisplay from "../components/FieldDisplay"

var parseFieldsDivOne = [];
var fieldPathDict = {};


export default class Fieldset  extends React.Component {



	constructor(props) {
	    super(props);
	    this.fetchFieldset = this.fetchFieldset.bind(this);
	    this.fieldBinding = this.fieldBinding.bind(this);
	    this.apexTypeToHtmlType = this.apexTypeToHtmlType.bind(this);
	    this.initFieldPathValue = this.initFieldPathValue.bind(this);

	    this.state = {accounts: [],filterText:'',hideId:false};

	    
	  }

	  fetchFieldset() {
	  	const filedsetName = "Application_FieldSet_One";    //this.props.fieldset;
	  	const objectName   = "genesis__Applications__c";  //this.props.objectApi;
	  	var vm = this;

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
	  	parseFields.map(function(item, index) {
	  		fieldPathDict[item.fieldPath] = '';
	  	});

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
	  }


	render() {


		return (
				<div>
					<h1> Fieldset </h1>
					<FieldDisplay appList = {parseFieldsDivOne} fieldPathDict={fieldPathDict}/>
				</div>
			);
	}
}