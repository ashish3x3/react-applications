import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";


//<Iframe iframe='iframe' src="http://plnkr.co/" height="500" width="500"/>

export default class Iframe  extends React.Component {

	constructor(props) {
	    super(props);

	    console.log('this.props ',this.props);
    
  	}

  	render() {
	    var IframeCont=this.props.iframe;
	 
	    return(
	      
	      <div>
	      
	       <IframeCont src={this.props.src} height={this.props.height} width={this.props.width}/>
	      
	      </div>
	      )
    }

}  	
