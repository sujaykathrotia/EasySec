var _EnHt = {};

_EnHt.onLoad = function() {

	//enforce if not https
	if (window.location.protocol != "https:") {
		var url = window.location.href.substring(window.location.protocol.length),
			httpsURL = "https:" + url,
			refURL = document.referrer.substr(6),
			httpsAttempts = (refURL === "" ? false : (url.indexOf(refURL) > -1));

		if(httpsAttempts === true || window.self !== window.top) {
			//console.log('donothing');
		} else {
			var me = this;
			/* Asking Background to check if site supports https*/
			chrome.extension.sendRequest({
				action: 'checkHTTPS',
				link:  httpsURL
			}, _EnHt.redirect);
		}
	}
};

_EnHt.redirect = function() {
	window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
};
