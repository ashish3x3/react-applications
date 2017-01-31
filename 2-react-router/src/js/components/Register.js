import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";

import Fieldset from "../pages/Fieldset"

import * as Actions from '../actions';

import { connect } from 'react-redux';



class Register  extends React.Component {
  
	constructor(props) {
	    super(props);
	    // this.handleClick = this.handleClick.bind(this);

  	}

  	handleClick(e) {
  		
  	}

  	componentDidMount() {

  		// if(this.props.accountFieldSet !== undefined) {
	   //  	this.setState({fieldset:this.props.accountFieldSet});
	   //  	console.log('state  ',this.state);
	   //  } else {
	   //  	this.setState({fieldset:'mandatoryFieldSetAccount'});

	   //  }

	   //  if(this.props.objectName !== undefined) {
	   //  	this.setState({fieldset:this.props.objectName},function() {
	   //  		console.log('state @@  ',this.state);

	   //  	});
	   //  } else {
	   //  	this.setState({objectName:'Account'});

	   //  }

	   //  this.setState({render:true}, function() {
	   // 		console.log('this.state $$',this.state);

	   //  });


	}

	componentWillUnmount() {

	}

	render() {
  //       var tableSt;


		// if(this.state.render !== false) {
  //           tableSt = (
  //       			<Fieldset objectName={this.props.objectName} filedsetName={this.props.fieldset} />
                
  //           )
  //       } 

		return (
				<div>
					<p> {this.props.objectName}  {this.props.fieldset}</p>
					<Fieldset objectName={this.props.objectName} filedsetName={this.props.fieldset} />


				</div>
			);
	}

} //class  


function mapStateToProps(state) {
    console.log('mapStateToProps register.js state ',state);
    return {
      fieldset:state.register.fieldset,
      objectName:state.register.objectName
  	};
      
};


function mapDispatchToProps(dispatch) {
	console.log('register.JS mapDispatchToProps home.js dispatch ',dispatch);

	return {
	  actions: bindActionCreators(Actions, dispatch)
	};
}



export default connect(mapStateToProps, Actions)(Register);