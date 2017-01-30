

import { ActionTypes } from '../actions';

export function getParentId(objectId) {

	return (dispatch, getState) => {

	    console.log('reached function for parentId',objectId);
	    if(objectId !== undefined) {
	    	var parentId;
	        ReactAccountController.getEsignUrlParentIdFromObjectId(objectId, 1, function(response, event) {
	            if(event.status) {
	                console.log('parentId in response = ',response);
	                parentId = response;
	                let esignUrl_urlSet = [];
	                
	                // var promiseForInterval = setInterval(function() {
	                // 	console.log('inide setInterval');
	                      esignUrl_urlSet = signingUrl(parentId, objectId);
	                //       console.log('eSignUrl ++++ ',esignUrl_urlSet[0]);
	                //       if (esignUrl_urlSet[1] != false) {
	                //           console.log('esignUrl stop ',esignUrl_urlSet[0]);
	                //           console.log('urlSet stop ',esignUrl_urlSet[1]);
	                //           stop(promiseForInterval);
	                //       }
	                      
	                //     }, 10000, 3, true);

	                
	                
	            } 
	            else {
	                parentId = '';
	            }   
	            
	            
	        },{ buffer: false, escape: true, timeout: 30000 });
	    }
	}
      
};
                                                              
export function stop(promiseForInterval) {
	clearInterval(promiseForInterval);

};                                                      
    
export function signingUrl(parentId, objectId) {
    console.log('getEsignUrlAgreementUrlFromParentId,parentId ',parentId,objectId);
    let urlSet = false;
    ReactAccountController.getEsignUrlAgreementUrlFromParentId(parentId, objectId, function(response, event) {
    	if(event.status) {
            console.log('url in response signingUrl = ',response);
            if(response == null) {
                console.log('response to return is null signingUrl = ',response);
            	return null;
            }
            urlSet = true;
            
            console.log('response to return is NOT null signingUrl = ',response);
            return [response,urlSet];
             
        } 
        else {
            eSignUrl = '';
        } 
    },{ buffer: false, escape: true, timeout: 30000 });
};