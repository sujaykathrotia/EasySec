$(function(){

	config = {
		api_endpoint: 'http://api.longurl.org/v1/',
		working_image: 'http://longurl.org/static/ajax_indicator_sm_round.gif'
	};
	
	known_services = [];
	var data_cache = [];

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

	//get all tiny urls
	getServicesFromAPI();
	//get all urls from page
	allLinks = $('a');

	checkLinks = function() {
		allLinks.each(function(){
		if($(this).attr('href')){
			var hrefl=$(this).attr('href');
			if(checkShorturlDomains(hrefl)){
			url =Expandlink(hrefl);
			
			$(this).attr('href',url);
			$(this).text(url);
			}
		}}); 
	}

	
	function checkShorturlDomains(href){
		for(var j=0; j<known_services.length; j++){
		//if link matches with shorturldomain
		if(href.indexOf(known_services[j])!=-1){
			return true;
		}
	}
	return false;
}

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

});