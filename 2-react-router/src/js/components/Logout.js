

import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";


export default class Logout  extends React.Component {
  
	constructor(props) {
	    super(props);
	    
  	}

  	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {

		return (
				<a href="/secur/logout.jsp"> Logout </a>
			);
	}

} //class  