import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";

import Fieldset from "../pages/Fieldset"



export default class Register  extends React.Component {
  
	constructor(props) {
	    super(props);
	    this.state = ({fieldset:'',objectName:'',recordId:'',render:false});
	    this.handleClick = this.handleClick.bind(this);
	    console.log('this.state %%% ',this.state);

	    console.log('this.props ',this.props);
	    let fieldset ;
		console.log('this.props.accountFieldSet ',this.props.accountFieldSet);



	    
    
  	}

  	handleClick(e) {
  		
  	}

  	componentDidMount() {

  		if(this.props.accountFieldSet !== undefined) {
	    	this.setState({fieldset:this.props.accountFieldSet});
	    	console.log('state  ',this.state);
	    } else {
	    	this.setState({fieldset:'mandatoryFieldSetAccount'});

	    }

	    if(this.props.objectName !== undefined) {
	    	this.setState({fieldset:this.props.objectName},function() {
	    		console.log('state @@  ',this.state);

	    	});
	    } else {
	    	this.setState({objectName:'Account'});

	    }

	    this.setState({render:true}, function() {
	   		console.log('this.state $$',this.state);

	    });


	}

	componentWillUnmount() {

	}

	render() {
        var tableSt;


		if(this.state.render !== false) {
            tableSt = (
        			<Fieldset objectName={this.state.objectName} filedsetName={this.state.fieldset} />
                
            )
        } 

		return (
				<div>
					<p>{this.props.userType} </p>
					<p>{this.props.accountFieldSet} </p>
					<p>{this.props.title} </p>

					{tableSt}


				</div>
			);
	}

} //class  