var httpreg = /http:\/\//;

if(httpreg.test(location.href)){
    var newloc = location.hfef;
    newloc.replace('http://','https://');
    
    window.navigate(newloc);
}