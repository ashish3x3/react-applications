import React from "react";
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory, withRouter, History   } from "react-router";
import Next from "../components/Next"
import Back from "../components/Back"
import Logout from "../components/Logout"  
import Login from "../components/Login"
import Register from "../components/Register"
import Esign from "../components/Esign"

import * as Actions from '../actions';

class FetchApplication  extends React.Component {

 componentDidMount() {
    this.props.requestApplicationList();
    
  }

 componentWillUnmount() {

  }


  render() {
    
    return ( 
      <div>
        <h1>Home </h1>
        <Select
            name="Fetch Application"
            value= {this.props.appValue}
            options={this.props.appList}
            onChange={this.props.logChange}
            placeholder="Select Application"
        />

      
        
      </div>
    );
  }
} 


   function mapStateToProps(state) {
    console.log('mapStateToProps home.js state ',state);
    return {
      appList: state.fetchApplication.applicationList,
      appValue: state.fetchApplication.value
      
    };
  }

   function mapDispatchToProps(dispatch) {
    console.log('HOME.JS mapDispatchToProps home.js dispatch ',dispatch);

    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }



export default connect(mapStateToProps, Actions)(FetchApplication);


