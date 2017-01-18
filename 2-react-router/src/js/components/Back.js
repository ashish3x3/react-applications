import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";


export default class Back  extends React.Component {
  
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);

	    console.log('this.props ',this.props);
    
  	}

  	handleClick(e) {
  		console.log('cliecked Back ');
  		this.props.setHistory.goBack();
  	}

  	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {

		return (
				<input type="button" id="btn" value="Back" onClick={this.handleClick} />
			);
	}

} //class  