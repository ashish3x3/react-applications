import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";
import Iframe from "../components/Iframe"


var showUrl = false;
var iframeFromForm;



export default class Back  extends React.Component {
  
	constructor(props) {
	    super(props);
	    
	    this.getYodleeLink = this.getYodleeLink.bind(this);
	    this.handleChange = this.handleChange.bind(this);

	    this.state = ({url:'',height:'700',width:'900',intervalId:'',username:'', password:''});

	    console.log('this.props !@#!',this.props);
    
  	}

  	getYodleeLink(e) {
  		console.log('event emitted :',e);
  		console.log('event emitted :',e.target);

  		var yodleeUrl ;
  		var username = '';    //sbMemvikas21@cli.com4
  		var password = '';    //asdfgCwerdr34#
  		var vm = this;

	  	ReactAccountController.getYodleeUrl(this.state.username, this.state.password,function(response, event) {
	        if(event.status) {
	                console.log('response yodlee url = ',response);
	                
	                yodleeUrl = 'https://na35.salesforce.com'+response;
	                console.log('yodleeUrl ',yodleeUrl);
	                showUrl = true;
	                vm.setState({url:yodleeUrl});

	        } 
	        else {
	            yodleeUrl = '';
	        }   
	        
	        
	    });
	} 

	handleChange(e) {
  		console.log('e e.target.name ',e.target.name);
  		console.log('e e.target.value ',e.target.value);

  		this.setState({[e.target.name]:e.target.value});

  	}

	componentDidMount() {
  		// this.getYodleeLink(); 

	   }

  	componentWillUnmount() {
  		// clearInterval(this.state.intervalId);

  	}   


	render() {
		if(showUrl === false) {

			iframeFromForm = 
			(
				<div>
					<form name="Yodlee_Credentials">
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
							<input type="button" className="btn btn-success centre" value="Login " onClick={this.getYodleeLink}  /> 
						</div>
					</form>
				</div>
			)

		} else {
			iframeFromForm = 
			(
				<Iframe iframe='iframe' src='https://secure.na1.echosign.com/public/apiesign?pid=CBFCIBAA3AAABLblqZhApqVXZSUJcsUlDw778fQRBKqTqn8J5nmIbyDi6SU4SOGqDBjooJbGb0K77M_rKyYo*' height={this.state.height} width={this.state.width} />
			)

		}


		return(
			<div>
				{iframeFromForm}
        	</div>

		);
	}

} //class 	