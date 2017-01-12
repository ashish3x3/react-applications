import React from "react";

import FormInputFieldCreator from "../components/FormInputFieldCreator"

export default class FieldDisplay  extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.setNewState = this.setNewState.bind(this);
    console.log('this.props @@@@ ',this.props);
    this.setNewState();
    this.state = {fieldPath: this.props.appList, fieldValue: this.props.fieldPathDict};
    this.handleUserInput = this.handleUserInput.bind(this);
    
    
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      fieldValue: this.state.fieldValue
    };

    console.log('Send this in a POST request:', formPayload)
    this.handleClearForm(e);

  }

  handleClearForm(e) {

    e.preventDefault();
    var default1 = this.props.fieldPathDict;

    var newState = Object.assign({}, this.state.fieldValue, {default1});
    this.setState({ fieldValue : this.props.fieldPathDict});

  }



  setNewState() {
    var stateFieldsDict = {};
    console.log('called setNewState');

    console.log('this.props ## ',this.props.appList);

    var app = this.props.appList;

    console.log('app ',app);

    app.map(function(item) {
      console.log('stateFieldsDict $$$$$$,item.fieldPath ',stateFieldsDict,item.fieldPath);
      // stateFieldsDict[item.fieldPath] = '';
      
    });
    // console.log('stateFieldsDict ',stateFieldsDict);
    // var vm =this;
    // this.setState(stateFieldsDict)
    // setTimeout(function() { vm.setState(stateFieldsDict); }, 1000);
    
   
  }

  handleUserInput(fieldPathName,fieldPathValue) {
    console.log('fieldPathName ',fieldPathName);
    var newState = Object.assign({}, this.state.fieldValue, {[fieldPathName]: fieldPathValue});
    this.setState({ fieldValue : newState});
  }

  handleUserRefInput(fieldPathName,fieldPathValue) {

  }

  componentDidMount() {
    // alert('components did mount')
    // this.setNewState();
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
    
    var rows = [];
    var inputValue = {};
    

    console.log('this.state ########',this.state);

    var fieldValue = this.state.fieldValue;

    console.log('fieldValue ',fieldValue);
    var vm =this;

    this.props.appList.map(function(item) {
        console.log('item ###',item);
        rows.push(<FormInputFieldCreator formElem = {item}  inputValue = {fieldValue} 
           onUserInput={vm.handleUserInput} />);
         
    })
  	return (

    <div>
     <h5>Pet Adoption Form</h5>
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