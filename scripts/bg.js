/* Object for handling background script */
var _es = {};

/* LongURL Services which will be filled using LongURL API call */
_es.LongURLservices = null;

/**
  * Start of background Script
  * Get options and/or other parameters required on startup of extension
  */
_es.start = function() {
	_es.getLongURLServices(function() {});
};

/**
  * Makes AJAX request to LongURL API to get all supported shorl url services
  */
_es.getLongURLServices = function(callback) {
	$.ajax({
		url: 'http://api.longurl.org/v2/services?format=json',
		dataType: 'json',
		success: function(data) {
			_es.LongURLservices = data;
			console.log(data);
			callback();	// Calling Callback after receiving services in JSON
		}
	});
};

/**
  * Makes AJAX request to LongURL API to get all supported shorl url services
  */
_es.getLongURL = function(link, callback) {
	var apiurl = 'http://api.longurl.org/v2/expand?',
		request = 'url=' + encodeURIComponent(link) +
			'&title=1' +		// Also get title to replace link's innerHTML
			'&format=json';

	$.ajax({
		url: apiurl + request,
		dataType: 'json',
		success: function(data) {
			if(data["type"]!="error") {
				data.short = link;
				callback(data);		// Calling Callback after getting long url
			}
		}
	});
};

/**
  * Handle request sent by content scripts
  */
chrome.extension.onRequest.addListener(function(request, sender, callback) {
	// TODO: Replace following if condition by JSON
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

/**
  * returning options and services to content script
  */
function returnOptionsAndServices(callback) {
	var obj = {
		known_services: _es.LongURLservices
	};
	callback(obj);
}

_es.start();
