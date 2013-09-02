$(function(){
	
	//check if first time using
	chrome.storage.local.get('first',function(data){
	
		if(data.first=='pup'){
			//not the first time; use saved dictionary
			chrome.storage.local.get('dictionary',function(data){
				var dictionary = data.dictionary;
				getURLandCheck(dictionary);
			});
		}else{
		//store a dictionary for first use
			var dictionary=["facebook.com","google.ca","youtube.com","microsoft.com","apple.com","yahoo.com","baidu.com","wikipedia.org","qq.com","linkedin.com","amazon.com","amazon.ca","live.com","twitter.com","blogspot.com","taobao.com","kijiji.com","bing.com","yandex.com","ebay.com","tumblr.com","mcgill.ca","wordpress.com","gc.ca","pinterest.com","craigslist.ca","craigslist.com","tdcanadatrust.com","paypal.com","msn.com","imgur.com","imdb.com","ebay.com","ebay.ca","td.com","instagram.com","msn.ca","reddit.com","cnn.com","cbc.ca","googleusercontent.com","royalbank.com","thepiratebay.sx","theweathernetwork.com","conduit.com","netflix.com","about.com","godaddy.com","bbc.co.uk","huffingtonpost.com","xvideos.com","xhamster.com","flickr.com","bmo.com","craigslist.org","pornhub.com","royalbank.com","stackoverflow.com","theglobeandmail.com","ask.com","vube.com","wordpress.org","thestar.com","go.com","scotiabank.com","pof.com","realtor.ca","cibc.com","blogger.com","hootsuite.com","aweber.com","adobe.com","fiverr.com","cyberpresse.ca","secureserver.net","futureshop.ca","dailymail.co.uk","reference.com","vimeo.com","akamaihd.net","rogers.com","kickass.to","indeed.com","redflagdeals.com","cnet.com","yellowpages.ca","nytimes.com","bestbuy.com","bell.ca","canadapost.ca","espn.go.com","amazonaws.com","livejasmin.com","canadiantire.ca","yelp.ca","youporn.com","pcfinancial.ca","nationalpost.com","tripadvisor.ca","warriorforum.com"];
			
			chrome.storage.local.set({'dictionary':dictionary},function(){});
			
			getURLandCheck(dictionary);
		}
	});
	
	chrome.storage.local.set({'first':'pup'},function(){});
	
function getURLandCheck(urlsDictionary){	
		
		//get page url
		url=window.location.href;
		
		//get domain only
		if(url.indexOf("http:")!=-1){

			url=url.substring(7);
		}
		else if(url.indexOf("https:")!=-1){
			url=url.substring(8);
		}

		if(url.indexOf("www")!=-1){
			url=url.substring(4);
		}

		if(url.indexOf("/")!=-1){
			url=url.substring(0,url.indexOf("/"));
		}
		else if(url.indexOf("?")!=-1){
			url=url.substring(0,url.indexOf("?"));
		}
		//console.log(url);

	//console.log(checkDistance(url));
	var matchBest = checkDistance(url,urlsDictionary);
	if(matchBest !== "") {
		var style = 'position: fixed; width: 100%; background-color:#d14836; color: #fafafa;font-size: 24px; padding: 20px;z-index:99999; border-bottom: 5px solid #fff;';
		var a = $("<div style='" + style + "'>Are you sure you want to browse <b>" + url + " </b> instead of <a target='_blank' style='color: #fafafa;' href='http://" + matchBest + "'><b>" + matchBest + "</b></a> ?</div>");
		$("body").prepend(a);
		
		
		var ignore = $("<span style='float: right; font-weight: bold;margin-right: 50px;cursor: pointer;'>ignore<span>");
		ignore.on("click", function() { a.hide();});
		a.append(ignore);
		
		var addtodic = $("<span style='float: right; font-weight: bold;margin-right: 50px;cursor: pointer;'>add To dictionary<span>");
		addtodic.on("click", function() { 
			
			urlsDictionary.push(url);
			chrome.storage.local.set({'dictionary':urlsDictionary},function(){});
			a.hide();
		});
		a.append(addtodic);
		
	}
}
function checkDistance(url,urlsDictionary){
	var likelyMatch="";
	for (var i = 0; i <urlsDictionary.length;i++) {
		t=getEditDistance(url,urlsDictionary[i]);
		
		//if full match then return safe
		if(t==0){
			return "";
		}
		//if typo, save then keep searching through dictionary
		if(t==1 || t==2 ||t==3){
			likelyMatch = urlsDictionary[i];
		}	
	};
	return likelyMatch;
}
});