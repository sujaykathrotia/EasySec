var _EnHt = {};

_EnHt.onLoad = function(){
	console.log('alive');
	
	//enforce if not https
	if (window.location.protocol != "https:"){
	    
		var httpsURL = "https:" + window.location.href.substring(window.location.protocol.length);
		var httpURL = window.location.href;
		
		value = localStorage['httpsAttempts'];
		console.log(value);
		if(value >= 1){
			//do nohing
			console.log('donothing');
		}
		else{
			var me = this;
			localStorage['httpsAttempts']=1;
			/* Asking Background to check if site supports https*/
			chrome.extension.sendRequest({
				action: 'checkHTTPS',
				link:  httpsURL
			}, _EnHt.redirect);
		}
					
	}
	else{
		
		localStorage['httpsAttempts']=0;
	}
};

_EnHt.redirect = function(){

	window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
};
