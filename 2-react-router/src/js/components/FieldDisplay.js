import React from "react";

import FormInputFieldCreator from "../components/FormInputFieldCreator"

var vm= this;

export default class FieldDisplay  extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    console.log('this.props @@@@ ',this.props);
    this.state = {fieldPath: this.props.appList, 
                  fieldValue: this.props.fieldPathDict, 
                  objectName: this.props.objectName,
                  fieldset: this.props.fieldset
                  };
    this.handleUserInput = this.handleUserInput.bind(this);
    
    
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      fieldValue: this.state.fieldValue
    };

    console.log('Send this in a POST request:', formPayload)
    // call remoting to save application w.r.t to specfic fieldset
    var objectFieldPathNameToFieldPathValueMap = {};
    var recordIdToUpdate = null;
    var formData = formPayload.fieldValue;
    Object.keys(formData).map(function(key, keyIndex) {
          objectFieldPathNameToFieldPathValueMap[key] = formData[key];
      // use keyName to get current key's name
      // and a[keyName] or a.keyName to get its value
    });

    console.log('objectFieldPathNameToFieldPathValueMap ',objectFieldPathNameToFieldPathValueMap);

    ReactAccountController.insertObject(this.state.objectName,
                                        this.state.fieldset, 
                                         objectFieldPathNameToFieldPathValueMap,
                                         recordIdToUpdate,
                                         function(response,
                                              event) {

                console.log('response,event ',response,event );


     });


    // this.handleClearForm(e);

  }

  handleClearForm(e) {

    e.preventDefault();
    var default1 = this.props.fieldPathDict;

    var newState = Object.assign({}, this.state.fieldValue, {default1});
    this.setState({ fieldValue : this.props.fieldPathDict});
    // this.forceUpdate()

  }



  handleUserInput(fieldPathName,fieldPathValue) {
    console.log('fieldPathName fieldPathValue ',fieldPathName,fieldPathValue);
    var fieldPathValueNew = {Id: fieldPathValue.value, label: fieldPathValue.label};
    console.log('fieldPathValueNew ',fieldPathValueNew);
    var newState = Object.assign({}, this.state.fieldValue, {[fieldPathName]: fieldPathValueNew});
    this.setState({ fieldValue : newState},function(){
      console.log('this state after reference value set again in FieldDisplay ',this.state);

    });
  }

  

  handleUserRefInput(fieldPathName,fieldPathValue) {
    console.log('fieldPathName fieldPathValue ',fieldPathName,fieldPathValue);
    var fieldPathValueNew = {Id: fieldPathValue.value, label: fieldPathValue.label};
    console.log('fieldPathValueNew ',fieldPathValueNew);
    var newState = Object.assign({}, this.state.fieldValue, {[fieldPathName]: fieldPathValueNew});
    this.setState({ fieldValue : newState},function(){
      console.log('this state after reference value set again in FieldDisplay ',this.state);

    });
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  render() {
    
    var rows = [];
    var inputValue = {};
    

    console.log('this.state ########',this.state);

    var fieldValue = this.state.fieldValue;

    console.log('fieldValue ',fieldValue);
    var vm =this;

    this.props.appList.map(function(item, keyIndex) {
        console.log('item ###',item);
        if(item.type === 'reference') {
          rows.push(<FormInputFieldCreator formElem = {item} key={keyIndex}  inputValue = {fieldValue} 
           onUserInput={vm.handleUserInput} />);
        } else {
          rows.push(<FormInputFieldCreator formElem = {item} key={keyIndex}  inputValue = {fieldValue} 
           onUserInput={vm.handleUserRefInput} />);
        }
        

        console.log('rows keyIndex',keyIndex,rows);
         
    })
  	return (

    <div>
     <h5></h5>
    		<form className="container" onSubmit={this.handleFormSubmit}>
    			{rows}
          <input
            type="submit"
            className="btn btn-primary float-right"
            value="Submit"/>
          <button
            className="btn btn-link float-left"
            onClick={this.handleClearForm}>Clear form</button>
        
  		  </form>
    </div>
  	);
  }






} //class