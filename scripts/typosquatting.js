$(function(){
	url=window.location.href;
	json=["facebook.com","google.com","google.ca","youtube.com","microsoft.com","apple.com","yahoo.com","baidu.com","wikipedia.org","linkedin.com","amazon.com","amazon.ca","live.com","twitter.com","blogspot.com","taobao.com","bing.com","yandex.com","ebay.com","tumblr.com","mcgill.ca"];
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
var matchBest = checkDistance(url);
if(matchBest !== "") {
	var style = 'position: fixed; width: 100%; background-color:#d14836; color: #fafafa;font-size: 24px; padding: 20px;z-index:99999; border-bottom: 5px solid #fff;';
	var a = $("<div style='" + style + "'>Are you sure you want to browse <b>" + url + " </b> instead of <a target='_blank' style='color: #fafafa;' href='http://" + matchBest + "'><b>" + matchBest + "</b></a> ?</div>");
	$("body").prepend(a);
	var span = $("<span style='float: right; font-weight: bold;margin-right: 50px;cursor: pointer;'>ignore<span>");
	span.on("click", function() { a.hide(); });
	a.append(span);
}

function checkDistance(url){
	for (var i = 0; i <json.length;i++) {
		t=getEditDistance(url,json[i]);
		if(t==1 || t==2 ||t==3){
			return json[i];
		}	
	};
	return "";
}
});