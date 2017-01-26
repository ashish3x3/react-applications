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
import FetchApplication from "../pages/FetchApplications";


import * as Actions from '../actions';


class Home  extends React.Component {

 componentDidMount() {
    this.props.requestApplicationList();
    
  }

 componentWillUnmount() {
    // clearInterval(this.timerID);
  }


  render() {
    
    return ( 
      <div>
        <h1>Home Page Application</h1>
        <Select
            name="Fetch Application"
            value= {this.props.appValue}
            options={this.props.appList}
            onChange={this.props.logChange}
            placeholder="Select Application"
        />

      /
        
      </div>
    );
  }
}

	function logChange(val) {
		var vm = this;
	    console.log("Selected: " );
	    console.log(val);
      console.log('val.value',val.value);
	    this.setState({ value: val.value }, function(){
        console.log('state %% ',this.state);
        var recordId = this.state.value;
        console.log('recordId ',recordId);
        var link = '/fieldset/genesis__Applications__c/Application_FieldSet_One/';
        // console.log('linl to pth ',link);
        // this.props.router.push('/fieldset')
        // browserHistory.push('/fieldset');
        // this.props.history.push('/fieldset/Account/mandatoryFieldSetAccount/');
        this.props.history.push(link+recordId);

        //hashHistory.push('/fieldset');
      });
      

  }

  function fetchApplicationForSelect() {
    // Visualforce.remoting.Manager.invokeAction('ReactAccountController.fetchAccount', finishDataLoad(result, event){
    var vm =this;
    // alert('called fetchAccount');
    ReactAccountController.fetchApplicationOnAccountId(function(result, event) {
      console.log('result fetchAccountForSelect ',result)

      // var result = result.map(function(result,index) {
      //       return <AccountsFields key={index} user={ result } />
      // });

      var appDictList = [];
      var map = {}
      var applications    = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));
      applications.forEach(function(app) {
      	map ={}
      	map['value'] = app.Id;
      	map['label'] = app.Name;

      	//create array of map with value and label
      	appDictList.push(map);
      })

      console.log('appDictList ',appDictList);

      vm.setState({applicationList:{appDictList}});

    },{escape:false});
        
    // });
    // this.setState({accounts:'set manually'});
  }


  function onSubmit() {
    console.log('clicked onSUbmit of fetchapplication');
    return false;
  }

   function mapStateToProps(state) {
    console.log('mapStateToProps home.js state ',state);
    return {
      appList: state.fetchApplication.applicationList,
      appValue: state.fetchApplication.value
      
    };
  }

   function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }



export default connect(mapStateToProps, Actions)(Home);

