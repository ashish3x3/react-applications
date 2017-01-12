import React from "react";

import SingleInput from "../components/SingleInput"


export default class FormInputFieldCreator  extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    console.log('e.target.name, this.fieldPathValue.value',e.target.name, e.target.value,'===', ); 
    //this.refs.myInput.value  //refs="myInput" in <input />
    this.props.onUserInput(
      e.target.name,
      e.target.value
    );
  }




  render() {
    var elem = this.props.formElem;
    console.log('elem ',elem.dbRequired,elem.fieldPath,elem.label,elem.objectName,elem.required,elem.type,elem);
    var inputElemValue = this.props.inputValue[elem.fieldPath];
    console.log('inputELemValue ',inputElemValue);
    // if(elem.fieldPath === 'genesis__Loan_Amount__c') {
    //   alert('matched genesis__Loan_Amount__c');
    //   console.log('this.props.inputValue[elem.fieldPath] ',this.props.inputValue[elem.fieldPath]);
    // }

    switch(elem.type.toLowerCase()) {
      case 'double': console.log('double elem ',elem.fieldPath);
                      return (
                        <div>
                            <SingleInput
                              inputType={'number'}
                              title={elem.label}
                              name={elem.fieldPath}
                              controlFunc={this.handleChange}
                              content={this.props.inputValue[elem.fieldPath]}
                              placeholder={'Enter '+ elem.label} /> 
                        </div>
                        
                      );
                      break;
      case 'picklist': console.log('double elem ',elem.fieldPath);
                      return (
                        <div>
                          <label for={elem.fieldPath}>{elem.label}</label>
                          <input type={elem.type} name={elem.fieldPath} value={this.props.inputValue[elem.fieldPath]} />
                        </div>
                      );
                      break;
      case 'date': console.log('double elem ',elem.fieldPath); 
                      return (
                        <div>
                          <label for={elem.fieldPath}>{elem.label}</label>
                          <input
                              type={elem.type}
                              name={elem.fieldPath}
                              defaultValue={this.props.inputValue[elem.fieldPath]}
                              onChange={this.handleChange}
                              placeholder={'Enter '+ elem.label} />
                        </div>
                      );
                      break;
      case 'reference': console.log('double elem ',elem.fieldPath); 
                      return (
                        <div>
                          <label for={elem.fieldPath}>{elem.label}</label>
                          <input type={elem.type} name={elem.fieldPath} value={this.props.inputValue[elem.fieldPath]} />
                        </div>
                      );
                      break;
      case 'text': console.log('double elem ',elem.fieldPath); 
                      return (
                        <div>
                          
                            <SingleInput
                              inputType={'text'}
                              title={elem.label}
                              name={elem.fieldPath}
                              controlFunc={this.handleChange}
                              content={this.props.inputValue[elem.fieldPath]}
                              placeholder={'Enter '+ elem.label} /> 
                        
                        </div>
                      );
                      break;

    }


    
    
    return (
      <div>
        <label for={elem.fieldPath}>{elem.label}</label>
        <input type={elem.type} name={elem.fieldPath} value={this.props.inputValue[elem.fieldPath]} />
      </div>
    );
  }


} //class