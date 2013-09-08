var _es = {};

/**
  * Bigin Extension
  * Run modules based on options we get from background
  * Every module must be represented as an object and must contain onLoad method
  * The structure of a module should be such that if onLoad method won't called,
  * then module should do nothing
  */
_es.begin = function(data) {
	_LiEx.onLoad(data);
};

/* Get Options and other parameters from Background */
chrome.extension.sendRequest({
	action: 'getOptionsAndServices'
}, _es.begin);
