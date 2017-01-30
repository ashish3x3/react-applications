import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";

import Iframe from "../components/Iframe";

import { connect } from 'react-redux';

import * as Actions from '../actions';


class Esign extends React.Component {
  
	constructor(props) {
	    super(props);
	    this.getParentId = this.getParentId.bind(this);
	    this.handleClick = this.handleClick.bind(this);

  	}

	getParentId() {
    var objectId;
    if(this.props.objectId === undefined) {
      objectId = 'a3O41000000HuEe';
    } else {
      objectId = this.props.objectId;
    }
      console.log('reached function for parentId',this.props.objectId);
      this.props.getParentId(objectId);
      
        
  };
                                                              
	handleClick(e) {
		console.log('cliecked Back ');
		this.props.setHistory.goBack();
	}

	componentDidMount() {
		this.getParentId(); 

   }

	componentWillUnmount() {

	}

	render() {

		return (
				<Iframe iframe='iframe' src={this.props.url} height={this.props.height} width={this.props.width} />

			);
	}

} //class  


function mapStateToProps(state) {
    console.log('mapStateToProps home.js state ',state);
    return {
      url: state.esign.url,
      height: state.esign.height,
      width: state.esign.width

      
    };
  }

   function mapDispatchToProps(dispatch) {
    console.log('HOME.JS mapDispatchToProps home.js dispatch ',dispatch);

    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }



export default connect(mapStateToProps, Actions)(Esign);