$(function(){
url=window.location.href;
json=["facebook.com","google.com","youtube.com","yahoo.com","baidu.com","wikipedia.org","linkedin.com","amazon.com","live.com","twitter.com","blogspot.com","taobao.com","bing.com","yandex.com","ebay.com","tumblr.com"];
console.log(url);
if(url.indexOf("http:")!=-1){
//console.log(url.substring());
}
else if(url.indexOf("https:")!=-1){

}

//var t=levenshteinDistance('frankenstein', 'frankestein');

t=getEditDistance('goe', 'goo');
console.log(t);
});