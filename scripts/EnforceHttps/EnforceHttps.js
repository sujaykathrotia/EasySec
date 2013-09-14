var _EnHt = {};

_EnHt.onLoad = function(){

	//enforce if not https
	if (window.location.protocol != "https:"){
	    
		var httpsURL = "https:" + window.location.href.substring(window.location.protocol.length);

		var me = this;
		/* Asking Background to check if site supports https*/
		chrome.extension.sendRequest({
			action: 'checkHTTPS',
			link:  httpsURL
		}, _EnHt.redirect);
			
	}
};

_EnHt.redirect = function(){

	window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
};
