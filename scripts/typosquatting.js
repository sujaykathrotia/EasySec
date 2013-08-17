$(function(){
	url=window.location.href;
	json=["facebook.com","google.com","youtube.com","microsoft.com","apple.com","yahoo.com","baidu.com","wikipedia.org","linkedin.com","amazon.com","live.com","twitter.com","blogspot.com","taobao.com","bing.com","yandex.com","ebay.com","tumblr.com","mcgill.ca"];
	console.log(url);
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
	console.log(url);
//var t=levenshteinDistance('frankenstein', 'frankestein');
console.log(checkDistance(url));

if(checkDistance(url) === true) {
	var style = 'position: fixed; width: 100%; background-color:red; color: #fafafa;font-size: 18px; padding: 5px 10px;z-index:99999';
	var a = $("<div style='" + style + "'>Are you sure you want to browse " + url + " ?</div>");
	$("body").prepend(a);
}

function checkDistance(url){
	for (var i = 0; i <json.length;i++) {
		t=getEditDistance(url,json[i]);
		if(t==1 || t==2 ||t==3){
			return true;
		}	
	};
	return false;
}
});