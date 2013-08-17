$(function(){

	config = {
		api_endpoint: 'http://api.longurl.org/v1/',
		working_image: 'http://longurl.org/static/ajax_indicator_sm_round.gif'
	};
	
	var links = this;
	var known_services = [];
	var data_cache = [];

	getServicesFromAPI = function() {
		console.log("Sdfdf");
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
		console.log(known_services);
	}

getServicesFromAPI();

	shorturlDomains = [ "bit.ly", "tinyurl.com","on.fb.me"];
	allLinks = $('a');
	allLinks.each(function(){
		if($(this).attr('href')){
			var hrefl=$(this).attr('href');
			if(checkShorturlDomains(hrefl)){
				//$(this).longurl();
				$(this).attr('href',"google.com");
				$(this).text("google.com");
			//	ExpandLink(url);
			}
		}}); 
	function checkShorturlDomains(href){
		for(var j=0; j<shorturlDomains.length; j++){
		//if link matches with shorturldomain
		if(href.indexOf(known_services[j])!=-1){
			return true;
		}
	}
	return false;
}

});