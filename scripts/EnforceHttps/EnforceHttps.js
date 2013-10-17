var _EnHt = {};

_EnHt.onLoad = function() {

	//enforce if not https
	if (window.location.protocol != "https:" && window.self === window.top) {
		var url = window.location.href.substring(window.location.protocol.length),
			httpsURL = "https:" + url,
			refURL = document.referrer.substr(6),
			httpsAttempts = (refURL === "" ? false : (url.indexOf(refURL) > -1));

		if(httpsAttempts === true) {
			/* Asking Background to disable enforcing https on this domain */
			current_domain = location.href.match(/^(?:https?:\/\/)?(?:www\.)?((?:[-\w]+\.)+[a-zA-Z]{2,})(\/.+)?/i)[1];
			chrome.extension.sendRequest({
				action: 'setOptions',
				domain: current_domain,
				module: "_EnHt",
				option: "1"
			}, function (){});
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
