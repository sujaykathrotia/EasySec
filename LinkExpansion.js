var shorturlDomains = [ /bit\.ly/, /tinyurl\.com/];
var allLinks = document.getElementsByTagName('a');

for(var i=0; i<allLinks.length;i++){
	for(var j=0; j<shorturlDomains.length; j++){
		//if link matches with shorturldomain
		if(shorturlDomains[i].test(allLinks[i])){
			//expand
		}
	}
}