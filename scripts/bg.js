var _es = {};
_es.LongURLservices = null;

_es.start = function() {
	_es.getLongURLServices(function() {});
};

_es.getLongURLServices = function(callback) {
	$.ajax({
		url: 'http://api.longurl.org/v2/services?format=json',
		dataType: 'json',
		success: function(data) {
			_es.LongURLservices = data;
			console.log(data);
			callback();
		}
	});
};

_es.getLongURL = function(link, callback) {
	var apiurl = 'http://api.longurl.org/v2/expand?',
		request = 'url=' + encodeURIComponent(link) +
			'&title=1' +
			'&format=json';

	$.ajax({
		url: apiurl + request,
		dataType: 'json',
		success: function(data) {
			if(data["type"]!="error") {
				data.short = link;
				callback(data);
			}
		}
	});
};

/**
 * Handle data sent by content scripts
 */
chrome.extension.onRequest.addListener(function(request, sender, callback) {
	if (request.action == 'getLongURL') {
		_es.getLongURL(request.link, callback);
	} else if (request.action == 'getOptionsAndServices') {
		if (_es.LongURLservices === null) { // Wait that the services list is present
			_es.getLongURLServices(function() { returnOptionsAndServices(callback); });
		} else {
			returnOptionsAndServices(callback);
		}
	}
});

function returnOptionsAndServices(callback) {
	var obj = {
		known_services: _es.LongURLservices
	};
	callback(obj);
}

_es.start();
