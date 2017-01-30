import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";

import * as Actions from '../actions';
import { connect } from 'react-redux';




class Login  extends React.Component {
  
	constructor(props) {
	    super(props);
	    // this.state = {username:'', password:''};
	    this.onSubmit = this.onSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);

	    console.log('this.props ',this.props);
    
  	}

  	onSubmit() {

  		console.log('this.props.username, this.props.password ',this.props.username, this.props.password);
  		this.props.onSubmit(this.props.username, this.props.password);

  	}


  	handleChange(e) {
  		console.log('e e.target.name ',e.target.name);
  		console.log('e e.target.value ',e.target.value);

  		this.props.handleChange({'name':e.target.name, 'value':e.target.value});

  	}

  	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {

		var errorDiv;

		if(this.props.error !== '') {
			errorDiv = (
				<div class="alert alert-danger">
				  <strong>Error!</strong> {this.props.error}
				</div>
				);
		}

		return (
				<div>
					<form name="Login">
						{errorDiv}
						<div className="text-left">
							<div className="row">
								<div className="col-12">
                       			   <label for="username">UserName</label>

									<input placeholder="UserName" name="username" value={this.props.username} onChange={this.handleChange} className="form-control"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
                       			   <label for="password">Password</label>

									<input placeholder="Password" name="password" type="password" value={this.props.password} onChange={this.handleChange}  className="form-control m-b-10"/>
								</div>
							</div>
							<br/>
							<input type="button" className="btn btn-success centre" value="Login " onClick={this.onSubmit}  /> 
						</div>
					</form>
				</div>
			);
	}

} //class  


function mapStateToProps(state) {
    console.log('mapStateToProps login.js state ',state);
    return {
      username       : state.login.username,
      password       : state.login.password,
      error          : state.login.error

      
    };
  }

function mapDispatchToProps(dispatch) {
  console.log('HOME.JS mapDispatchToProps login.js dispatch ',dispatch);

  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, Actions)(Login);