import React from "react";

import AccountsFieldDisplay from "../components/AccountsFieldDisplay"


export default class AccountsFields  extends React.Component {
    render(){
        var rows = [];
        var tableSt;
        // alert(typeof this.props.acc);
        console.log('this.props  ',this.props);

        console.log('this.props.acc  ',this.props.acc);
        console.log('this.props.acc length ',this.props.acc.length);
        console.log('this.props.filterText  ',this.props.filterText);
        const filter = this.props.filterText;
        const hideIdInp = this.props.hideId;
        this.props.acc.forEach(function(acc) {
            console.log('this.props.filterText,hideIdInp ',filter,hideIdInp);
            if (acc.Name.indexOf(filter) === -1) {
                return;
            }
        	rows.push(<AccountsFieldDisplay acc ={acc} key ={acc.Id} hasHideIt={hideIdInp} />);
        });

        if(hideIdInp === true) {
            tableSt = (
                <table border="1">
                    <thead>
                      <tr>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            )
        } else {
            tableSt = (
                <table border="1">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Id</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            )
        }


        return(
        <div>
            {tableSt}
        </div>
        );
    }
};