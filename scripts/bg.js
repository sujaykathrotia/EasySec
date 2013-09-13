/* Object for handling background script */
var _es = {};

_es.modules = [];

_es.modules.push({
	title: "Link Expansion",
	id: "_LiEx"
}, {
	title: "Enforce HTTPS",
	id: "_EnHt"
}, {
	title: "Domain Verification",
	id: "_TySq"
});

/* Creating Domain Settings Object */
var domains = new Lawnchair({ name:'domains' }, function (store) {});

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
	} else if (request.action == 'getOptions') {
		if (_es.LongURLservices === null) { // Wait that the services list is present
			_es.getLongURLServices(function() { returnOptionsAndServices(request.domain, callback); });
		} else {
			returnOptionsAndServices(request.domain, callback);
		}
	} else if (request.action == 'setOptions') {
		setSetting(request.module, request.option, request.domain);
		callback();
	}
});

/**
  * returning options and services to content script
  */
function returnOptionsAndServices(domain, callback) {
	getModules(domain, function (modules) {
		var obj = {
			modules: modules,
			known_services: _es.LongURLservices
		};

		callback(obj);
	});
}

_es.start();





Array.prototype.clone = function() {
	return this.slice(0);
};

function onVersionChanged() {
	$.each(_es.modules, function(index, module) {
		var object = localStorage[module.id];
		if(typeof object === "undefined" || object === null) {
			localStorage[module.id] = true;
		}
	});
}

function getVersion() {
	return chrome.app.getDetails().version;
}

if (getVersion() != localStorage['version']) {
	localStorage['version'] = getVersion();
	onVersionChanged();
}

function getModules(domain, callback) {
	var x = _es.modules.clone();
	
	getDomainSetting(domain, function(dS) {
		for(var i=0; i<x.length; i++) {
			var module = x[i].id;
			var object = localStorage[module];
			if(typeof object !== "undefined" && object !== null) {
				if(object == "false") {
					x[i].enabled = 0;
				} else {
					if(dS[x[i].id] == false)
						x[i].enabled = 1;
					else
						x[i].enabled = 2;
				}
			} else {
				x[i].enabled = 2;
			}
		}
		console.log(x);
		callback(x);
	});
	
}

function getDomainSetting(domain, callback) {
	domains.get(domain, function(ob) {
		if(typeof ob !== "undefined" && ob !== null)
			dS = ob.value;
		else
			dS = {};

		callback(dS);
	});
}

function setSetting(module, option, domain) {
	console.log(module + " : " + option + " : " + domain);
	if(option == 0) {
		localStorage[module] = false;
	} else {
		localStorage[module] = true;
		var value = false;
		if(option == 1) {
			value = false;
		} else {
			value = true;
		}
		domains.get(domain, function(object) {
			var domainObject = {};
			if(typeof object !== "undefined" && object !== null) {
				domainObject = object.value;
			}
			domainObject[module] = value;
			domains.save({key: domain, value: domainObject });
		});
	}
}
