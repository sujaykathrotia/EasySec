var _es = {};

_es.begin = function(data) {
	_LiEx.onLoad(data);
};

chrome.extension.sendRequest({
	action: 'getOptionsAndServices'
}, _es.begin);
