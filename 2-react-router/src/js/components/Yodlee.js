import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";
import Iframe from "../components/Iframe"

import * as Actions from '../actions';

import { connect } from 'react-redux';



var showUrl = false;
var iframeFromForm;



class Yodlee extends React.Component {
  
	constructor(props) {
	    super(props);
	    
	    this.getYodleeLink = this.getYodleeLink.bind(this);
	    this.handleChange = this.handleChange.bind(this);

	    // this.state = ({url:'',height:'700',width:'900',intervalId:'',username:'', password:''});

	    console.log('this.props !@#!',this.props);
    
  	}

  	getYodleeLink(e) {

  		console.log('this.props.username, this.props.password ',this.props.username, this.props.password);

  		this.props.getYodleeLink(this.props.username, this.props.password);

  		// this.props.getYodleeLink(this.props.username, this.props.password);
  		// console.log('event emitted :',e);
  		// console.log('event emitted :',e.target);

  		// var yodleeUrl ;
  		// var username = '';    //sbMemvikas21@cli.com4
  		// var password = '';    //asdfgCwerdr34#
  		// var vm = this;

	  	// ReactAccountController.getYodleeUrl(this.state.username, this.state.password,function(response, event) {
	   //      if(event.status) {
	   //              console.log('response yodlee url = ',response);
	                
	   //              yodleeUrl = 'https://na35.salesforce.com'+response;
	   //              console.log('yodleeUrl ',yodleeUrl);
	   //              showUrl = true;
	   //              vm.setState({url:yodleeUrl});

	   //      } 
	   //      else {
	   //          yodleeUrl = '';
	   //      }   
	        
	        
	   //  });
	} 

	handleChange(e) {
  		console.log('e e.target.name ',e.target.name);
  		console.log('e e.target.value ',e.target.value);
  		console.log('this.props ',this.props);

  		this.props.handleChangeYodlee({'name':e.target.name, 'value':e.target.value});

  		// this.setState({[e.target.name]:e.target.value});

  	}

	componentDidMount() {
  		// this.getYodleeLink(); 

	   }

  	componentWillUnmount() {
  		// clearInterval(this.state.intervalId);

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


		if(this.props.showUrl === false) {

			iframeFromForm = 
			(
				<div>
					<form name="Yodlee_Credentials">
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
							<input type="button" className="btn btn-success centre" value="Login " onClick={this.getYodleeLink}  /> 
						</div>
					</form>
				</div>
			)

		} else {
			iframeFromForm = 
			(
				<Iframe iframe='iframe' src={this.props.url} height={this.props.height} width={this.props.width} />
			)

		}


		return(
			<div>
				{errorDiv}
				{iframeFromForm}
        	</div>

		);
	}

} //class 	

function mapStateToProps(state) {
    console.log('mapStateToProps yodlee.js state ',state);
    return {
      username: state.yodlee.username,
      password: state.yodlee.password,
      url     : state.yodlee.url,
      height  : state.yodlee.height,
      width   : state.yodlee.width,
      error   : state.yodlee.error,
      showUrl : state.yodlee.showUrl
      
    };
  }

   function mapDispatchToProps(dispatch) {
    console.log('HOME.JS mapDispatchToProps home.js dispatch ',dispatch);

    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }



export default connect(mapStateToProps, Actions)(Yodlee);