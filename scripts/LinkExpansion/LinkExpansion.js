$(function(){

	config = {
		api_endpoint: 'http://api.longurl.org/v1/',
		working_image: 'http://longurl.org/static/ajax_indicator_sm_round.gif'
	};
	
//=================prototyping===========================================//

	/* loads all longurl compatible services */
	getServicesFromAPI = function() {
		jQuery.ajax({
			type: 'GET',
			url: 'http://api.longurl.org/v1/services?format=json',
			dataType: 'json',
			success: function(data) {
				
				if (typeof(data.messages) === 'undefined') {
					saveKnownServices(data);
					//modifyShortLinks();
				}
			}
		});
	};
	
	/* pushes a new know service to Known_services array */
	saveKnownServices = function(data) {
		
		for (var x in data) { // Foreach service
			if (typeof(data[x]) === 'object') {
				for (var y in data[x]) { // Foreach domain
					if (typeof(data[x][y]) === 'string') {
						known_services.push(data[x][y]);
					}
				}
				
			}
		}
		
		known_services = known_services.sort();

		checkLinks();
	};

	/* Checks all links for matches to known short url services */
	checkLinks = function() {
		allLinks.each(function(){
		if($(this).attr('href')){
			var hrefl=$(this).attr('href');
			//console.log(hrefl);
			var flag=checkShorturlDomains(hrefl);
			if(flag!=""){
				//console.log(flag);
				//console.log(hrefl.indexOf(flag));
				hrefl=hrefl.substring(hrefl.indexOf(flag));
				if(hrefl.indexOf("&")!=-1){
					hrefl=hrefl.substring(0,hrefl.indexOf("&"));
				}

				//console.log(hrefl);
			url =Expandlink(hrefl);
			
			$(this).attr('href',url);
			$(this).text(url);
			}
		}}); 
	}

	/* check if link matches known short url service */
	function checkShorturlDomains(href){
		//console.log(href);
		for(var j=0; j<known_services.length; j++){
			//if link matches with shorturldomain
			if(href.indexOf(known_services[j])!=-1){

				return known_services[j];
			}
			else{
				//console.log(href);
			}
		}		
		return "";
	}

	/* api call to expand link */
	function Expandlink(url){
		var longurl;
		var apiURL = "http://api.longurl.org/v2/expand?url="+ url + "&format=json";
		
		$.ajax({
		url: apiURL,
		dataType: "json",
		async:false,
		success: function(data){
			
			if(data["type"]!="error"){
				longurl = data["long-url"];
			}
			else{
				longurl=url;
			}
		}
		});
		return longurl;
		
	}

//=========================main===================================================//

	var known_services = ['bit.ly','t.co','ow.ly','tinyurl.com','goo.gl','su.pr','is.gd','cli.gs'];
	var data_cache = [];

	//get all urls from page
	allLinks = $('a');
	checkLinks();

});
