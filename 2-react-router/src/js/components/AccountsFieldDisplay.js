import React from "react";


export default class AccountsFieldDisplay  extends React.Component {
    render() {
    var name = this.props.acc.Name;
    var hideItInp = this.props.hasHideIt;
    var trStr;
    if(hideItInp == false) {
    	return (
	    	<tr>
		        <td>{name}</td>
		        <td>{this.props.acc.Id}</td>
		    </tr>
	      
	    );
    	
    } else {
    	return (
	    	<tr>
		        <td>{name}</td> 
		    </tr>
	      
	    );
    	
  		}
	}
};