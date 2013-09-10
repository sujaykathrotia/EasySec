var _es = {};

/**
  * Bigin Extension
  * Run modules based on options we get from background
  * Every module must be represented as an object and must contain onLoad method
  * The structure of a module should be such that if onLoad method won't called,
  * then module should do nothing
  */
_es.begin = function(data) {
	for (var i = 0; i < data.modules.length; i++) {
		if(data.modules[i].enabled === 2)
			window[data.modules[i].id].onLoad(data);
	}
};

var current_domain = location.href.match(/^(?:https?:\/\/)?(?:www\.)?((?:[-\w]+\.)+[a-zA-Z]{2,})(\/.+)?/i)[1];

/* Get Options and other parameters from Background */
chrome.extension.sendRequest({
	action: 'getOptions',
	domain: current_domain
}, _es.begin);
