/* Link Expansion object */
var _LiEx = {};

_LiEx.shortURLs = {};	// List of short URLs

/**
  * On load of the script
  */
_LiEx.onLoad = function(data) {
	_LiEx.known_services = data.known_services;
	// Listen for DOM modification
	document.body.addEventListener('DOMNodeInserted', function(e) {
		var relatedNode = $(e.relatedNode); // Get Related Node and find A tag
		relatedNode.find('a').each(function(index, el) {
			_LiEx.expandLink(el);			// Call Expand link for each A tag
		});
	}, false);

	// Register document.ready Event to get All links from DOM
	_LiEx.processDOMLinks();
};

/**
  * Register document.ready Event to get All links from DOM
  */
_LiEx.processDOMLinks = function() {
	$(document).ready(function($) {
		$("a").each(function(index, el) {
			_LiEx.expandLink(el);
		});
	});
};

/* Process Links */
_LiEx.expandLink = function(el) {
	if(_LiEx.checkLink(el) == 2) {
		var href = el.href;
		_LiEx.shortURLs[href] = _LiEx.shortURLs[href] || new URLData();
		_LiEx.shortURLs[href].addElement($(el));	// Equeue elements that needed to be changed
	}
};

/**
  * Check for category of url
  * @Arguments HTML <A> Node
  * @Returns int
  * 0: Same domain or unknown,
  * 1: Different Domain
  * 2: Possible shortened URL
  */
_LiEx.checkLink = function(a) {
	if(!a) return 0;

	// This regex return false if the link is an anchor (href="#...")
	// This regex return false if the link execute javascript (href="javascript:...")\
	var match = a.href.match(/^(?:https?:\/\/)?(?:www\.)?((?:[-\w]+\.)+[a-zA-Z]{2,})(\/.+)?/i);
	var domain = false;		// Get Domain by matching RegEx
	var params = false;		// Get Everyting after domain name by matching RegEx
	if (match) {
		// domain[0] == a.href ; We just want the domain ; obtained with domain[1] for that regex
		domain = match[1];
		if (match[2]) {
			params = match[2]; // There is some data (it's not simply the service url)
		}

		// Only process links from a different domain
		if (document.location.host.indexOf(domain) < 0 && params) {
			if(params.indexOf("?") > -1 || !_LiEx.known_services[domain]) {
				return 1;	// Links pointing to external url but not known shortner service
			} else {
				return 2;	// Links corresponding to a known url shortener service
			}
		}
	}
	return 0;		// Return 0 by default
};

/**
  * URLData is a class to store elements corrospond to a URL
  * and applies methods to add and replace links
  */
function URLData() {
	x = {
		longURL: false,		// Long URL will be stored once fatched from background
		title: false,		// Title of URL will be stored once fatched from background
		elements: [],		// A Nodes linking corrosponding URL
		makeRequest: function(url) {
			var me = this;
			/* Asking Background to get Long URL */
			chrome.extension.sendRequest({
				action: 'getLongURL',
				link: url
			}, _LiEx.process);
		},
		process: function(longURL) {
			var me = this;
			me.longURL = longURL["long-url"];
			me.title = longURL["title"];
			/* Change url and title of each Element */
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
				// If Long URL for this shortened URL has not been requested
				me.elements.push(a);
				me.longURL = true;
				/*  Request background for long url unblocking way
					If makeRequest method called directly, 
					then blocks other elements to make request     */
				setTimeout(function() { me.makeRequest(a[0].href); }, 0);
			} else if(me.longURL === true) {
				// Long URL has already been requested -> wait
				me.elements.push(a);
			} else {
				// Long URL is known in this page. Just replace the URL
				me.replaceURL(a);
			}
		}
	};
	return x;	// Returns new object for storing Nodes and making Request
}

/**
  * Upon receiving Long URL from background, process A Nodes
  */
_LiEx.process = function(data) {
	_LiEx.shortURLs[data.short].process(data);
};
