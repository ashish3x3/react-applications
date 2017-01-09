import React from "react";

import AccountsFieldDisplay from "../components/AccountsFieldDisplay"


export default class AccountsFields  extends React.Component {
    render(){
        var rows = [];
        // alert(typeof this.props.acc);
        console.log('this.props.acc  ',this.props.acc);
        console.log('this.props.acc length ',this.props.acc.length);
        this.props.acc.forEach(function(acc) {
        	rows.push(<AccountsFieldDisplay acc ={acc} key ={acc.Id} />);
        });
        return(
            <table>
		        <thead>
		          <tr>
		            <th>Name</th>
		            <th>Id</th>
		          </tr>
		        </thead>
		        <tbody>{rows}</tbody>
		     </table>
        );
    }
};