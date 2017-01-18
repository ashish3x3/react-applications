import React from "react";

import FormInputFieldCreator from "../components/FormInputFieldCreator"

import Next from "../components/Next"


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
    this.asyncOperation = this.asyncOperation.bind(this);
    this.pause = this.pause.bind(this);
    
  }

  asyncOperation(objectFieldPathNameToFieldPathValueMap,recordIdToUpdate) {
    let res;
    console.log('called async oper');
    var vm = this;
      const p = new Promise(
        function (resolve, reject) { 
             console.log('iniside function');

            ReactAccountController.insertObject(vm.state.objectName,
                                        vm.state.fieldset, 
                                         objectFieldPathNameToFieldPathValueMap,
                                         recordIdToUpdate,
                                         function(response,
                                              event) {

                console.log('response,event ',response,event );
                if(event.status) {
                  res = true;
                  resolve(res);

                } else {
                  res = false;
                  reject(res);
                }


          });



        });

      return p;


  }

  handleFormSubmit(e) {
    // e.preventDefault();

    const formPayload = {
      fieldValue: this.state.fieldValue
    };

    console.log('Send this in a POST request:', formPayload)
    var objectFieldPathNameToFieldPathValueMap = {};
    var recordIdToUpdate = null;
    var formData = formPayload.fieldValue;
    Object.keys(formData).map(function(key, keyIndex) {
          objectFieldPathNameToFieldPathValueMap[key] = formData[key];
    });

    console.log('objectFieldPathNameToFieldPathValueMap ',objectFieldPathNameToFieldPathValueMap);

    var resToReturn;

    return this.asyncOperation(objectFieldPathNameToFieldPathValueMap,recordIdToUpdate).then(value => {console.log('value # succ',value);resToReturn = true;}).catch(error => {console.log('value ## rej ',value);resToReturn = false;});

    // this.pause(3000);


    // // setTimeout(function () {
           
    // //         setStatusMessage('Done');
    // //          sleep(5000);
    // //     }, 0);


    // console.log('resToReturn ',resToReturn);

    // return resToReturn;
    // ReactAccountController.insertObject(this.state.objectName,
    //                                     this.state.fieldset, 
    //                                      objectFieldPathNameToFieldPathValueMap,
    //                                      recordIdToUpdate,
    //                                      function(response,
    //                                           event) {

    //             console.log('response,event ',response,event );
    //             if(response !== null) {
    //               return true;

    //             } else {
    //               return false;
    //             }


    //  });

  }

  handleClearForm(e) {

    e.preventDefault();
    var default1 = this.props.fieldPathDict;

    var newState = Object.assign({}, this.state.fieldValue, {default1});
    this.setState({ fieldValue : this.props.fieldPathDict});
    // this.forceUpdate()

  }



  handleUserInput(fieldPathName,fieldPathValue) {
    console.log('fieldPathName fieldPathValue',fieldPathName,fieldPathValue);
    var newState = Object.assign({}, this.state.fieldValue, {[fieldPathName]: fieldPathValue});
    this.setState({ fieldValue : newState}, function() {
      console.log('new state in fielddispaly ',this.state);
    });
  }

  handleUserRefInput(fieldPathName,fieldPathValue) {

  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
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
        rows.push(<FormInputFieldCreator formElem = {item} key={keyIndex}  inputValue = {fieldValue} 
           onUserInput={vm.handleUserInput} />);

        console.log('rows keyIndex',keyIndex,rows);
         
    })
  	return (

    <div>
     <h5></h5>
    		<form className="container" onSubmit={this.handleFormSubmit}>
    			{rows}
          <Next route='login' onClick={this.handleFormSubmit} setHistory={this.props.history} />

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