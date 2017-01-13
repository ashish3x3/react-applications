import React from "react";

export default class Search  extends React.Component {

	constructor(props) {
	super(props);
	this.handleChange = this.handleChange.bind(this);
	}
  
  handleChange() {
    this.props.onUserInput(
      this.filterTextInput.value,
      this.hideIdInput.checked
    );
  }
    render() {
    
    return (
      <form>
        <input  type="text" 
            placeholder="Search..." 
		        value={this.props.filterText} 
		        onChange={this.handleChange} 
            className="form-select form-control"
		        ref={(input) => this.filterTextInput = input}/>

		 <p>
          <input
            type="checkbox"
            checked={this.props.hideId}
            ref={(input) => this.hideIdInput = input}
            onChange={this.handleChange}
          />
          {' '}
          Hide Ids
        </p>
        
      </form>
    );
  }
};