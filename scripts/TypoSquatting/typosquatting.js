var _TySq = {};

_TySq.topDomains = ["facebook.com","google.com","youtube.com","microsoft.com","apple.com","yahoo.com","baidu.com","wikipedia.org","qq.com","linkedin.com","amazon.com","amazon.ca","live.com","twitter.com","blogspot.com","taobao.com","kijiji.com","bing.com","yandex.com","ebay.com","tumblr.com","mcgill.ca","wordpress.com","gc.ca","pinterest.com","craigslist.ca","craigslist.com","tdcanadatrust.com","paypal.com","msn.com","imgur.com","imdb.com","ebay.com","ebay.ca","td.com","instagram.com","msn.ca","reddit.com","cnn.com","cbc.ca","googleusercontent.com","royalbank.com","thepiratebay.sx","theweathernetwork.com","conduit.com","netflix.com","about.com","godaddy.com","bbc.co.uk","huffingtonpost.com","xvideos.com","xhamster.com","flickr.com","bmo.com","craigslist.org","pornhub.com","royalbank.com","stackoverflow.com","theglobeandmail.com","ask.com","vube.com","wordpress.org","thestar.com","go.com","scotiabank.com","pof.com","realtor.ca","cibc.com","blogger.com","hootsuite.com","aweber.com","adobe.com","fiverr.com","cyberpresse.ca","secureserver.net","futureshop.ca","dailymail.co.uk","reference.com","vimeo.com","akamaihd.net","rogers.com","kickass.to","indeed.com","redflagdeals.com","cnet.com","yellowpages.ca","nytimes.com","bestbuy.com","bell.ca","canadapost.ca","espn.go.com","amazonaws.com","livejasmin.com","canadiantire.ca","yelp.ca","youporn.com","pcfinancial.ca","nationalpost.com","tripadvisor.ca","warriorforum.com"];

var current_domain = location.href.match(/^(?:https?:\/\/)?(?:www\.)?((?:[-\w]+\.)+[a-zA-Z]{2,})(\/.+)?/i)[1];

_TySq.onLoad = function(data) {
	_TySq.getURLandCheck(data.topDomains);
};

_TySq.getURLandCheck = function (urlsDictionary) {
	var domain = current_domain.split(".").splice(-2).join(".");
	var matchBest = _TySq.checkDistance(domain, urlsDictionary);
	if(matchBest !== "") {
		var style = 'position: fixed; top: 0px; width: 100%;background: linear-gradient(to bottom, #D14836 0%,#CC0D00 100%);color: #fafafa;font-size: 13px;padding: 6px 15px;z-index: 99999;box-shadow: 0px 0px 15px #333;border-bottom: 2px solid #D60000;';
		var a = $("<div style='" + style + "'>Are you sure you want to browse <b>" + current_domain + " </b> instead of <a target='_blank' style='color: #fafafa;' href='http://" + matchBest + "'><b>" + matchBest + "</b></a> ?</div>");
		
		$("body").prepend(a);
		
		var ignore = $("<span style='float: right; font-weight: bold;margin-right: 50px;cursor: pointer;'>ignore<span>");
		ignore.on("click", function() {
			a.hide();
			chrome.extension.sendRequest({
				action: 'setOptions',
				domain: current_domain,
				module: "_TySq",
				option: "1"
			}, function (){});
		});
		
		a.append(ignore);
	}
};


var likelyMatch = "";
var likelyDist = 4;
_TySq.checkDistance = function (url, urlsDictionary) {
	for (var i = 0; i < urlsDictionary.length; i++) {
		t = getEditDistance(url,urlsDictionary[i]);
		//if full match then return safe
		if(t === 0) {
			return "";
		}
		//if typo, save then keep searching through dictionary
		if(t > 0 && t < likelyDist) {
			likelyMatch = urlsDictionary[i];
			likelyDist = t;
		}
	}
	return likelyMatch;
};
