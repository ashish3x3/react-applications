import React from "react";


export default class AccountsFieldDisplay  extends React.Component {
    render() {
    var name = this.props.acc.Name;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.acc.Id}</td>
      </tr>
    );
  }
};