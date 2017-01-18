import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";


export default class Login  extends React.Component {
  
	constructor(props) {
	    super(props);
	    this.state = {username:'', password:''};
	    this.onSubmit = this.onSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);

	    console.log('this.props ',this.props);
    
  	}

  	onSubmit(e) {
  		console.log('e ',e.target);
  		console.log('e ',this.state);

  		ReactAccountController.RemoteLogin(this.state.username, this.state.password, function(response,
                                                                       event) {

  			console.log('response ',response);
  			if (response.indexOf('Login Error') === -1) {
                
                var textArea = document.createElement('textarea');
                textArea.innerHTML = response;
                const isLoginSuccessful =  textArea.value;
                console.log('isLoginSuccessful ',isLoginSuccessful);
                
                window.location = isLoginSuccessful;
                
            } else {
                 console.log('response error : ',response);
            }


  		});

  	}
  	handleChange(e) {
  		console.log('e e.target.name ',e.target.name);
  		console.log('e e.target.value ',e.target.value);

  		this.setState({[e.target.name]:e.target.value});

  	}

  	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {

		return (
				<div>
					<form name="Login">
						<div className="text-left">
							<div className="row">
								<div className="col-12">
                       			   <label for="username">UserName</label>

									<input placeholder="UserName" name="username" value={this.state.username} onChange={this.handleChange} className="form-control"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
                       			   <label for="password">Password</label>

									<input placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange}  className="form-control m-b-10"/>
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