import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";


export default class Next  extends React.Component {
  
	constructor(props) {
	    super(props);
	    this.state = ({route: '', params:{}, onClick:''});
	    this.handleClick = this.handleClick.bind(this);

	    console.log('this.props ',this.props);
    
  	}

  	handleClick(e) {
  		console.log('cliecked ');
  		var res = this.props.onClick();
  		console.log('res returned ', res.then(value => {alert(value);}));
  		// console.log('["[[PromiseStatus]]"] ',res.Promise["[[PromiseStatus]]"])
  		if(res === true) {
  			console.log('CHANGE ROUTE -- route,res ',this.props.route,res);
  			var link = '/'+ this.props.route;
	    	console.log('this.props ',this.props,e);
	    	this.props.setHistory.push(link);

  		} else {
  			console.log('DON\'T CHANGE ROUTE -- route,res ',this.props.route,res);

  		}
  	}

  	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {

		return (
				<input type="button" id="btn" value="Next" onClick={this.handleClick} />
			);
	}

} //class  