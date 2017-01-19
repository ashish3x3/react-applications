import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory, withRouter, History   } from "react-router";

import Iframe from "../components/Iframe"

var urlSet = false;
var eSignUrl = '';



export default class Back  extends React.Component {
  
	constructor(props) {
	    super(props);
	    //this.props.objectId
	    //this.props.typeNo

	    this.getParentId = this.getParentId.bind(this);
	    this.stop = this.stop.bind(this);
	    this.signingUrl = this.signingUrl.bind(this);
	    this.handleClick = this.handleClick.bind(this);


	    this.state = ({url:'https://secure.na1.echosign.com/public/apiesign?pid=CBFCIBAA3AAABLblqZhApqVXZSUJcsUlDw778fQRBKqTqn8J5nmIbyDi6SU4SOGqDBjooJbGb0K77M_rKyYo*',height:'700',width:'900',intervalId:''});

	    console.log('this.props !@#!',this.props);
    
  	}

  	getParentId() {
            console.log('reached function for parentId',this.props.objectId);
            if(this.props.objectId !== undefined) {
            	var vm =this;
            	var parentId;
                ReactAccountController.getEsignUrlParentIdFromObjectId(this.props.objectId, 1, function(response, event) {
                    if(event.status) {
                        console.log('parentId in response = ',response);
                        parentId = response;
                        
                        var promiseForInterval = setInterval(function() {
                        	console.log('inide setInterval');
                              vm.signingUrl(parentId, vm.props.objectId);
                              console.log('eSignUrl ++++ ',eSignUrl);
                              if (urlSet != false) {
                                  console.log('eSignUrl stop ',eSignUrl);
                                  console.log('urlSet stop ',urlSet);
                                  this.stop();
                              }
                              
                            }, 10000, 3, true);

                        vm.setState({intervalId: promiseForInterval});
                        
                        
                    } 
                    else {
                        parentId = '';
                    }   
                    
                    
                },{ buffer: false, escape: true, timeout: 30000 });
            }
              
        };
                                                              
        stop() {
			clearInterval(this.state.intervalId);

        };                                                      
            
        signingUrl(parentId, objectId) {
            console.log('getEsignUrlAgreementUrlFromParentId,parentId ',parentId,objectId);
            ReactAccountController.getEsignUrlAgreementUrlFromParentId(parentId, objectId, function(response, event) {
            	if(event.status) {
                    console.log('url in response signingUrl = ',response);
                    if(response == null) {
                        console.log('response to return is null signingUrl = ',response);
                    	return null;
                    }
                    urlSet = true;
                    eSignUrl = response;
                    // url = $sce.trustAsResourceUrl(eSignUrl);
                    console.log('response to return is NOT null signingUrl = ',response);
                    return response;
                     
                } 
                else {
                    eSignUrl = '';
                } 
            },{ buffer: false, escape: true, timeout: 30000 });
        };
                                                              
       

  	handleClick(e) {
  		console.log('cliecked Back ');
  		this.props.setHistory.goBack();
  	}

  	componentDidMount() {
  		this.getParentId(); 

	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);

	}

	render() {

		return (
				<Iframe iframe='iframe' src={this.state.url} height={this.state.height} width={this.state.width} />

			);
	}

} //class  