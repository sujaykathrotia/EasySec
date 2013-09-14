var _EnHt = {};

//enforce if not https
if (window.location.protocol != "https:"){
    
        var httpsURL = "https:" + window.location.href.substring(window.location.protocol.length);

	//check if site supports https
	$.ajax({
		type: "HEAD",
		url: httpsURL,
		success: function(message, text, response) {

			//200 response means we're in business
			if(response.status=200) {
				window.location.href = httpsURL;
			}
		}
	});
		
}
