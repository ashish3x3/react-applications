import React from "react";
import { connect } from 'react-redux';

import * as Actions from '../actions';

import Fieldset from "../pages/Fieldset";




import FormInputFieldCreator from "../components/FormInputFieldCreator"

import Next from "../components/Next"


class FieldDisplay  extends React.Component {

  render() {
    
    var rows = [];
    var inputValue = {};
    

    // console.log('this.state ########',this.state);

    var fieldValue = this.props.fieldPathDict;

    console.log('fieldValue ',fieldValue);
    var vm =this;

    this.props.appList.map(function(item, keyIndex) {
        console.log('item ###',item);
        rows.push(<FormInputFieldCreator formElem = {item} key={keyIndex}  inputValue = {fieldValue} 
           onUserInput={vm.props.handleUserInput} />);

        // console.log('rows keyIndex',keyIndex,rows);
         
    }); 
    // <br/>
    return (

    <div>
     <h5></h5>
        <form className="container" onSubmit={this.props.handleFormSubmit}>
          {rows}
          <Next route='login' onClick={this.props.handleFormSubmit} setHistory={this.props.history} />

          <input
            type="submit"
            className="btn btn-primary float-right"
            value="Submit"/>
          <button
            className="btn btn-link float-left"
            onClick={this.props.handleClearForm}>Clear form</button>
        
        </form>
    </div>
    );
  }
  // /
  


  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

} //class



function mapStateToProps(state) {
    console.log('mapStateToProps FieldDisplay.js state ',state);
    return {
      filedsetName      : state.fieldset.filedsetName,
      objectName        : state.fieldset.objectName,
      recordId          : state.fieldset.recordId,
      appList           : state.fieldset.parseFieldsDivOne,
      fieldPathDict     : state.fieldset.fieldPathDict,
      fieldPathName     : state.fieldDisplay.fieldPathDict,
      fieldPathValue    : state.fieldDisplay.fieldPathValue
    };
  }

function mapDispatchToProps(dispatch) {
  console.log('HOME.JS mapDispatchToProps home.js dispatch ',dispatch);

  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, Actions)(FieldDisplay);