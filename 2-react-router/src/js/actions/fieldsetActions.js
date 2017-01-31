

// import { REQUEST_APPSLIST, RECEIVED_APPSLIST, RECEIVED_APPSLIST_VALUE, LOG_APP_SELECT, USER_INPUT_FIELDSET, RECEIVED_FIELDSET,FIELDSET_FAILED, FIELDSET_SAVED } from '../actions';

import { ActionTypes } from '../actions';




// Fieldset Actions

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

      if(item.type.toLowerCase() === 'date' && item.value !== undefined) {
        const newDate = item.value.split(" ")[0];
        
        fieldPathDict[item.fieldPath] = newDate;

      } else if(item.value !== undefined) {
        fieldPathDict[item.fieldPath] = item.value;

      }
      // if(item.type == 'reference') {
      //  fieldPathDict[item.fieldPath] = {};
      // } else{
      //  fieldPathDict[item.fieldPath] = '';
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

    var picklistFieldName = [];
    var referenceListFieldName = [];
    var picklistResultByFieldName = [];
    var referenceResultByFieldName = [];



    if(recordId !== undefined) {
      console.log('inisde if not undefined recordId');
      ReactAccountController.getFieldSetInfoWithValue(filedsetName, objectName, recordId, function(result, event) {
        var fieldsetList = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));
        console.log('fieldsetList ',fieldsetList);

        

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

            dispatch({  type: ActionTypes.RECEIVED_FIELDSET,
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

          // var picklistFieldName = [];
          // var referenceListFieldName = [];
          // var picklistResultByFieldName = [];
          // var referenceResultByFieldName = [];

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

                  dispatch({  type: ActionTypes.RECEIVED_FIELDSET,
                      objectName: objectName,
                      filedsetName: filedsetName,
                      parseFieldsDivOne: parseDivWithFieldeDict.parseFieldsDivOne,
                      fieldPathDict: parseDivWithFieldeDict.fieldPathDict
                    });

                });


              });



        });
    }

    }

}
