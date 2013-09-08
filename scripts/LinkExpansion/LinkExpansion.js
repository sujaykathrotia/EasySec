var _LiEx = {};

_LiEx.shortURLs = {};	// List of short URLs

/**
  * On load of the script
  */
_LiEx.onLoad = function(data) {
	_LiEx.known_services = data.known_services;
	// Listen for DOM modification (ajax request = potential shortened url)
	document.body.addEventListener('DOMNodeInserted', function(e) {
		var relatedNode = $(e.relatedNode); // Check children recursively
		relatedNode.find('a').each(function(index, el) {
			_LiEx.expandLink(el);
		});
	}, false);
};

$(document).ready(function($) {
	console.log(_LiEx);
	$("a").each(function(index, el) {
		_LiEx.expandLink(el);
	});
});

_LiEx.expandLink = function(el) {
	if(_LiEx.checkLink(el) == 2) {
		var href = el.href;
		_LiEx.shortURLs[href] = _LiEx.shortURLs[href] || new URLData();
		_LiEx.shortURLs[href].addElement($(el));	// Equeue elements that needed to be changed
	}
};

/**
  * Check for category of url
  * 0: Same domain or unknown,
  * 1: Different Domain
  * 2: Possible url shortner service url
  */
_LiEx.checkLink = function(a) {
	if(!a) return 0;

	// This regex return false if the link is an anchor (href="#...")
	// This regex return false if the link execute javascript (href="javascript:...")\
	var match = a.href.match(/^(?:https?:\/\/)?(?:www\.)?((?:[-\w]+\.)+[a-zA-Z]{2,})(\/.+)?/i);
	var domain = false;
	var params = false;
	if (match) {
		// domain[0] == a.href ; We just want the domain ; obtained with domain[1] for that regex
		domain = match[1];
		if (match[2]) {
			params = match[2]; // There is some data (it's not simply the service url)
		} else {
			params = "";
		}

		// Only process links from a different domain and links corresponding to a known url shortener service
		if (document.location.host.indexOf(domain) < 0) {
			if(params.indexOf("?") > -1 || !_LiEx.known_services[domain]) {
				return 1;
			} else {
				return 2;
			}
		}
	}
	return 0;
};

/**
  * URLData is a class to store elements related to corrospond to url
  * and applies methods to add 
  */
function URLData() {
	x = {
		longURL: false,
		title: false,
		elements: [],
		makeRequest: function(url) {
			var me = this;
			chrome.extension.sendRequest({
				action: 'getLongURL',
				link: url
			}, _LiEx.process);
		},
		process: function(longURL) {
			var me = this;
			me.longURL = longURL["long-url"];
			me.title = longURL["title"];
			$.each(me.elements, function(index, val) {
				me.replaceURL(val);
			});
		},
		replaceURL: function(a) {
			var me = this;
			a.attr('href', me.longURL);
			a.text(me.title);
			a.removeAttr('onclick'); a.removeAttr('onmouseover');
			// if(val.text().) only replace link text in a tag
		},
		addElement: function(a) {
			var me = this;
			if(me.longURL === false) {
				me.elements.push(a);
				me.longURL = true;
				setTimeout(function() { me.makeRequest(a[0].href); }, 0);
			} else if(me.longURL === true) { //wait
				me.elements.push(a);
			} else {
				me.replaceURL(a);
			}
		}
	};
	return x;
}

_LiEx.process = function(data) {
	_LiEx.shortURLs[data.short].process(data);
};
