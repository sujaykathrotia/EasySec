/* Object for handling background script */
var _es = {};

_es.modules = [];

_es.modules.push({
	title: "Link Expansion",
	id: "_LiEx"
}, {
	title: "Enforce HTTPS",
	id: "_EnHt"
}, {
	title: "Domain Verification",
	id: "_TySq"
});

/* Creating Domain Settings Object */
var domains = new Lawnchair({ name:'domains' }, function (store) {});

/* LongURL Services which will be filled using LongURL API call */
_es.LongURLservices = null;

/* Top visiting domains */
_es.topDomains = ["google.com", "facebook.com", "youtube.com", "yahoo.com", "baidu.com", "wikipedia.org", "qq.com", "linkedin.com", "live.com", "twitter.com", "amazon.com", "blogspot.com", "taobao.com", "google.co.in", "wordpress.com", "yahoo.co.jp", "bing.com", "yandex.ru", "sina.com.cn", "google.de", "ebay.com", "vk.com", "hao123.com", "googleusercontent.com", "tumblr.com", "google.co.uk", "pinterest.com", "163.com", "google.fr", "msn.com", "google.co.jp", "google.com.br", "mail.ru", "weibo.com", "paypal.com", "microsoft.com", "instagram.com", "blogger.com", "ask.com", "google.com.hk", "xvideos.com", "apple.com", "google.ru", "soso.com", "tmall.com", "google.it", "craigslist.org", "imdb.com", "sohu.com", "google.es", "360.cn", "bbc.co.uk", "xhamster.com", "go.com", "stackoverflow.com", "google.com.mx", "fc2.com", "amazon.co.jp", "cnn.com", "google.ca", "neobux.com", "alibaba.com", "imgur.com", "akamaihd.net", "youku.com", "flickr.com", "wordpress.org", "conduit.com", "t.co", "odnoklassniki.ru", "vube.com", "delta-search.com", "adcash.com", "thepiratebay.sx", "huffingtonpost.com", "godaddy.com", "amazon.de", "pornhub.com", "espn.go.com", "blogspot.in", "bp.blogspot.com", "adobe.com", "ku6.com", "about.com", "google.com.tr", "ebay.de", "ifeng.com", "google.com.au", "reddit.com", "uol.com.br", "renren.com", "google.pl", "ebay.co.uk", "adf.ly", "dailymotion.com", "aol.com", "livejasmin.com", "cnet.com", "netflix.com", "youporn.com", "rakuten.co.jp", "dailymail.co.uk", "amazon.co.uk", "babylon.com", "globo.com", "avg.com", "redtube.com", "vimeo.com", "alipay.com", "sogou.com", "themeforest.net", "aliexpress.com", "secureserver.net", "china.com.cn", "nytimes.com", "kickass.to", "indiatimes.com", "google.com.ar", "google.com.sa", "dropbox.com", "google.nl", "fiverr.com", "hootsuite.com", "booking.com", "amazonaws.com", "slideshare.net", "ameblo.jp", "xnxx.com", "pixnet.net", "it168.com", "livejournal.com", "onclickads.net", "google.com.eg", "directrev.com", "livedoor.com", "deviantart.com", "wikimedia.org", "google.com.pk", "yelp.com", "aweber.com", "bannersdontwork.com", "outbrain.com", "theguardian.com", "mediafire.com", "yesky.com", "stumbleupon.com", "etsy.com", "weather.com", "wikia.com", "4shared.com", "google.co.th", "blogfa.com", "google.com.tw", "mozilla.org", "media.tumblr.com", "jd.com", "mywebsearch.com", "addthis.com", "qtrax.com", "foxnews.com", "torrentz.eu", "sourceforge.net", "google.co.za", "w3schools.com", "archive.org", "badoo.com", "hostgator.com", "pcpop.com", "bankofamerica.com", "forbes.com", "caijing.com.cn", "jrj.com.cn", "liveinternet.ru", "statcounter.com", "wikihow.com", "clkmon.com", "google.co.id", "files.wordpress.com", "flipkart.com", "warriorforum.com", "salesforce.com", "chase.com", "reference.com", "google.co.ve", "tube8.com", "xyxy.net", "soundcloud.com", "zedo.com", "buzzfeed.com", "spiegel.de", "indeed.com", "tripadvisor.com", "lady8844.com", "google.com.co", "wigetmedia.com", "photobucket.com", "mailchimp.com", "softonic.com", "walmart.com", "yieldmanager.com", "skype.com", "google.gr", "pconline.com.cn", "google.com.vn", "allegro.pl", "github.com", "55bbs.com", "google.be", "ask.fm", "telegraph.co.uk", "xinhuanet.com", "goo.ne.jp", "mashable.com", "bet365.com", "nbcnews.com", "leboncoin.fr", "people.com.cn", "empowernetwork.com", "nicovideo.jp", "onet.pl", "beva.com", "bild.de", "google.com.ua", "youjizz.com", "google.cn", "domaintools.com", "wellsfargo.com", "douban.com", "wsj.com", "google.com.ng", "uploaded.net", "answers.com", "php.net", "amazon.fr", "taringa.net", "thefreedictionary.com", "shutterstock.com", "ikea.com", "wordreference.com", "chinaz.com", "zillow.com", "comcast.net", "google.com.ph", "google.se", "blogspot.com.es", "pandora.com", "usatoday.com", "naver.jp", "goal.com", "rutracker.org", "google.ro", "gmx.net", "wix.com", "4dsply.com", "weebly.com", "rediff.com", "mercadolivre.com.br", "ehow.com", "moz.com", "marca.com", "washingtonpost.com", "goodreads.com", "tudou.com", "samsung.com", "ups.com", "zol.com.cn", "bleacherreport.com", "rambler.ru", "ucoz.ru", "ilivid.com", "reuters.com", "kaskus.co.id", "google.com.pe", "56.com", "so.com", "naver.com", "google.dz", "google.at", "wp.pl", "loading-delivery1.com", "google.ch", "popads.net", "clickbank.com", "scribd.com", "stackexchange.com", "histats.com", "tianya.cn", "web.de", "nfl.com", "free.fr", "google.com.sg", "hardsextube.com", "constantcontact.com", "disqus.com", "businessinsider.com", "avito.ru", "aili.com", "extratorrent.com", "bitly.com", "detik.com", "google.cl", "xing.com", "hp.com", "trafficunit.in", "libero.it", "gsmarena.com", "olx.in", "xe.com", "cnzz.com", "58.com", "codecanyon.net", "espncricinfo.com", "imageshack.us", "meetup.com", "bluehost.com", "putlocker.com", "infusionsoft.com", "bloomberg.com", "cj.com", "google.pt", "mobile01.com", "siteadvisor.com", "qvo6.com", "usps.com", "google.com.bd", "fedex.com", "hurriyet.com.tr", "hudong.com", "milliyet.com.tr", "varzesh3.com", "ign.com", "orange.fr", "dmm.co.jp", "tinyurl.com", "in.com", "goodgamestudios.com", "onlylady.com", "beeg.com", "optmd.com", "bestbuy.com", "ndtv.com", "clixsense.com", "joomla.org", "motherless.com", "webmd.com", "pof.com", "thefreecamsecret.com", "americanexpress.com", "techcrunch.com", "ig.com.br", "feedly.com", "odesk.com", "elpais.com", "jqw.com", "google.cz", "target.com", "iqiyi.com", "linkbucks.com", "google.com.my", "webs.com", "likes.com", "repubblica.it", "nih.gov", "istockphoto.com", "zippyshare.com", "tmz.com", "speedtest.net", "youm7.com", "doubleclick.com", "w3.org", "blogspot.de", "enet.com.cn", "ebay.it", "ebay.com.au", "groupon.com", "xcar.com.cn", "bitauto.com", "kakaku.com", "clicksor.com", "terra.com.br", "blackhatworld.com", "quikr.com", "elmundo.es", "tagged.com", "kooora.com", "mlb.com", "rt.com", "freelancer.com", "hulu.com", "surveymonkey.com", "twoo.com", "pchome.net", "pengyou.com", "drudgereport.com", "abcnews.go.com", "naukri.com", "ebay.in", "dell.com", "yandex.ua", "quora.com", "ameba.jp", "google.ie", "gazeta.pl", "eyny.com", "uimserv.net", "match.com", "hdfcbank.com", "t-online.de", "google.co.hu", "pch.com", "google.ae", "twitch.tv", "google.no", "rapidgator.net", "snapdeal.com", "getresponse.com", "seznam.cz", "ning.com", "habrahabr.ru", "abril.com.br", "zendesk.com", "jimdo.com", "engadget.com", "isohunt.com", "goo.gl", "soku.com", "cloudfront.net", "att.com", "123rf.com", "microsoftonline.com", "hypergames.net", "exoclick.com", "9gag.com", "elance.com", "ad6media.fr", "webcrawler.com", "ck101.com", "force.com", "capitalone.com", "webmoney.ru", "amazon.cn", "google.dk", "myfreecams.com", "list-manage.com", "digg.com", "snapdo.com", "latimes.com", "typepad.com", "pclady.com.cn", "mercadolibre.com.ar", "sahibinden.com", "adultfriendfinder.com", "xda-developers.com", "ganji.com", "searchnu.com", "google.co.kr", "chinanews.com", "time.com", "cbssports.com", "lenovo.com", "commentcamarche.net", "news.com.au", "lemonde.fr", "google.co.il", "google.az", "gutefrage.net", "foursquare.com", "doorblog.jp", "homedepot.com", "expedia.com", "retailmenot.com", "backpage.com", "fotolia.com", "4399.com", "nydailynews.com", "xunlei.com", "java.com", "searchfun.in", "icicibank.com", "semrush.com", "youdao.com", "m2newmedia.com", "lenta.ru", "sape.ru", "drtuber.com", "swagbucks.com", "amazon.it", "hatena.ne.jp", "probux.com", "issuu.com", "searchengines.ru", "corriere.it", "taleo.net", "justdial.com", "vnexpress.net", "pcauto.com.cn", "kijiji.ca", "bodybuilding.com", "upworthy.com", "fbcdn.net", "hubspot.com", "moneycontrol.com", "intoday.in", "gotomeeting.com", "chaturbate.com", "who.is", "ebay.fr", "majesticseo.com", "narod.ru", "citrixonline.com", "lifehacker.com", "mysearchresults.com", "subscene.com", "zing.vn", "opensiteexplorer.org", "shareasale.com", "trulia.com", "okcupid.com", "chip.de", "github.io", "kickstarter.com", "daum.net", "rbc.ru", "amung.us", "gmw.cn", "monster.com", "shaadi.com", "namecheap.com", "workercn.cn", "yellowpages.com", "kinopoisk.ru", "verizonwireless.com", "tabelog.com", "2ch.net", "xgo.com.cn", "accuweather.com", "jquery.com", "theblaze.com", "newegg.com", "csdn.net", "p5w.net", "ero-advertising.com", "hubpages.com", "mihanblog.com", "autohome.com.cn", "website-unavailable.com", "mercadolibre.com.mx", "ancestry.com", "softpedia.com", "eastmoney.com", "doublepimp.com", "sberbank.ru", "altervista.org", "mobile.de", "kompas.com", "google.sk", "turbobit.net", "pixiv.net", "blogspot.jp", "oneindia.in", "oracle.com", "traidnt.net", "liveleak.com", "battle.net", "digitalpoint.com", "squidoo.com", "over-blog.com", "dianping.com", "2345.com", "timeanddate.com", "gc.ca", "cy-pr.com", "slate.com", "etao.com", "cam4.com", "jobrapido.com", "seesaa.net", "klout.com", "lefigaro.fr", "tutsplus.com", "foxsports.com", "onlinesbi.com", "wiktionary.org", "google.fi", "linksynergy.com", "cnbc.com", "voc.com.cn", "farsnews.com", "jabong.com", "ezinearticles.com", "mp3skull.com", "zimbio.com", "linkwithin.com", "babytree.com", "ya.ru", "hotels.com", "citibank.com", "bhaskar.com", "nifty.com", "ovh.net", "kimiss.com", "cbsnews.com", "eazel.com", "tradedoubler.com", "free-tv-video-online.me", "ppstream.com", "marketwatch.com", "templatemonster.com", "livescore.com", "126.com", "cntv.cn", "as.com", "virgilio.it", "gawker.com", "viadeo.com", "maktoob.com", "houzz.com", "scoop.it", "spankwire.com", "intuit.com", "sakura.ne.jp", "tokobagus.com", "lequipe.fr", "independent.co.uk", "eonline.com", "fatakat.com", "steampowered.com", "babycenter.com", "letitbit.net", "eventbrite.com", "d1110e4.se", "hidemyass.com", "39.net", "irctc.co.in", "wretch.cc", "cbslocal.com", "behance.net", "iminent.com", "cracked.com", "rottentomatoes.com", "evernote.com", "twimg.com", "folha.uol.com.br", "npr.org", "wired.com", "premierleague.com", "allrecipes.com", "homeway.com.cn", "examiner.com", "filestube.com", "itau.com.br", "gogetlinks.net", "yxlady.com", "zeobit.com", "mynet.com", "amazon.es", "urbandictionary.com", "gizmodo.com", "wunderground.com", "ca.gov", "blogspot.com.au", "zanox.com", "mgid.com", "filehippo.com", "skysports.com", "informer.com", "stockstar.com", "outlook.com", "ce.cn", "immobilienscout24.de", "priceline.com", "streamcloud.eu", "feedburner.com", "zoho.com", "asos.com", "blogspot.ru", "people.com", "lanacion.com.ar", "gogvo.com", "gamespot.com", "pr-cy.ru", "dict.cc", "coupons.com", "leo.org", "subito.it", "ccb.com", "persianblog.ir", "careerbuilder.com", "jeuxvideo.com", "mercadolibre.com.ve", "taboola.com", "agoda.com", "ci123.com", "myntra.com", "espnfc.com", "gulfup.com", "51job.com", "ixxx.com", "allocine.fr", "porntube.com", "all-free-download.com", "custhelp.com", "google.lk", "klikbca.com", "search-results.com", "clarin.com", "duckduckgo.com", "biglobe.ne.jp", "sears.com", "peyvandha.ir", "focus.de", "sapo.pt", "haberturk.com", "mapquest.com", "haber7.com", "chexun.com", "icbc.com.cn", "fhserve.com", "mirror.co.uk", "vk.me", "alarabiya.net", "haxiu.com", "macys.com", "aizhan.com", "rightmove.co.uk", "idnes.cz", "imagebam.com", "nokia.com", "adjuggler.net", "howstuffworks.com", "aljazeera.net", "yixun.com", "qunar.com", "anonym.to", "bloglovin.com", "screencast.com", "yourlust.com", "m-w.com", "myspace.com", "magentocommerce.com", "nu.nl", "tabnak.ir", "infolinks.com", "glassdoor.com", "lowes.com", "businessweek.com", "sfgate.com", "realtor.com", "ctrip.com", "glispa.com", "ibm.com", "google.co.nz", "jvzoo.com", "4tube.com", "rutor.org", "nuvid.com", "correios.com.br", "disney.go.com", "4chan.org", "google.kz", "mtv.com", "keezmovies.com", "10086.cn", "rednet.cn", "dafont.com", "zappos.com", "welt.de", "interia.pl", "bankmellat.ir", "hongkiat.com", "dmoz.org", "zhaopin.com", "r7.com", "nordstrom.com", "tomshardware.com", "sulekha.com", "dangdang.com", "digikala.com", "gap.com", "mangareader.net", "chinabroadcast.cn", "southwest.com", "deezer.com", "donedrive.net", "duowan.com", "today.com", "sky.com", "google.com.kw", "gumtree.com", "xtube.com", "slickdeals.net", "coccoc.com", "dreamstime.com", "keepvid.com", "pornerbros.com", "acesse.com", "milanuncios.com", "graphicriver.net", "bitshare.com", "patch.com", "pantip.com", "bravotube.net", "foodnetwork.com", "amazon.ca", "heise.de", "r10.net", "yomiuri.co.jp", "noaa.gov", "dhgate.com", "wanggou.com", "dx.com", "gamefaqs.com", "wetter.com", "okwave.jp", "azlyrics.com", "google.com.ec", "tripadvisor.co.uk", "addmefast.com", "whitepages.com", "adscale.de", "prestashop.com", "mpnrs.com", "google.bg", "wetransfer.com", "searchengineland.com", "akhbarak.net", "google.com.qa", "basecamp.com", "way2sms.com", "trklnks.com", "infobae.com", "ellechina.com", "verizon.com", "usmagazine.com", "telegraaf.nl", "vice.com", "biblegateway.com", "woorank.com", "perezhilton.com", "europa.eu", "xiaomi.com", "baiducontent.com", "manta.com", "google.com.do", "24h.com.vn", "yandex.com.tr", "brainyquote.com", "ad4game.com", "pcmag.com", "pornhublive.com", "bbc.com", "leagueoflegends.com", "alimama.com", "logmein.com", "ria.ru", "adclickxpress.com", "bestblackhatforum.com", "android.com", "marktplaats.nl", "cloob.com", "sitepoint.com", "mysql.com", "forgeofempires.com", "shopathome.com", "kioskea.net", "indianrail.gov.in", "myegy.com", "rayli.com.cn", "tradus.com", "ahrefs.com", "amazon.in", "ovh.com", "shopclues.com", "zazzle.com", "webhostingtalk.com", "xbox.com", "overstock.com", "skyrock.com", "video-one.com", "sporx.com", "caixa.gov.br", "smh.com.au", "qidian.com", "pagesjaunes.fr", "bannersbroker.com", "ezpowerads.com", "elegantthemes.com", "linternaute.com", "staples.com", "kdnet.net", "gstatic.com", "mixi.jp", "sfr.fr", "vporn.com", "cnblogs.com", "wmmail.ru", "so-net.ne.jp", "sitesell.com", "yoka.com", "paipai.com", "novinky.cz", "888.com", "united.com", "statscrop.com", "chron.com", "gamer.com.tw", "barnesandnoble.com", "kayak.com", "nationalgeographic.com", "wmtransfer.com", "adnxs.com", "grooveshark.com", "airtel.in", "miniclip.com", "aftonbladet.se", "189.cn", "eluniversal.com.mx", "payoneer.com", "hespress.com", "dropboxusercontent.com", "livedoor.biz", "panet.co.il", "cafemom.com", "cocolog-nifty.com", "1und1.de", "autotimes.com.cn", "thechive.com", "smashingmagazine.com", "facenama.com", "exblog.jp", "buscape.com.br", "vancl.com", "yandex.kz", "avast.com", "pcgames.com.cn", "excite.co.jp", "lollipop-network.com", "cheezburger.com", "gtmetrix.com", "weheartit.com", "viva.co.id", "movie4k.to", "nikkei.com", "nypost.com", "flippa.com", "yihaodian.com", "forexfactory.com", "anysex.com", "lumosity.com", "hsbc.co.uk", "gismeteo.ru", "ucoz.com", "mayoclinic.com", "vipshop.com", "delicious.com", "reverso.net", "17ok.com", "nike.com", "ocn.ne.jp", "makeuseof.com", "plugrush.com", "getbootstrap.com", "delta.com", "104.com.tw", "change.org", "easyhits4u.com", "hupu.com", "tinypic.com", "pcanalysis.net", "myfitnesspal.com", "last.fm", "comcast.com", "pixlr.com", "sweetim.com", "incredibar.com", "orf.at", "xhamstercams.com", "youtube-mp3.org", "inbox.com", "idealo.de", "box.com", "friv.com", "theverge.com", "sueddeutsche.de", "prweb.com", "woothemes.com", "imagevenue.com", "pinshan.com", "adhitprofits.com", "icicibank.co.in", "pingdom.com", "craigslist.ca", "largeporntube.com", "nairaland.com", "qianyan001.com", "bhphotovideo.com", "mega.co.nz", "gazzetta.it", "dantri.com.vn", "cnr.cn", "dribbble.com", "css-tricks.com", "rapidshare.com"];

/**
  * Start of background Script
  * Get options and/or other parameters required on startup of extension
  */
_es.start = function() {
	_es.getLongURLServices(function() {});
};

/**
  * Makes AJAX request to LongURL API to get all supported shorl url services
  */
_es.getLongURLServices = function(callback) {
	$.ajax({
		url: 'http://api.longurl.org/v2/services?format=json',
		dataType: 'json',
		success: function(data) {
			_es.LongURLservices = data;
			console.log(data);
			callback();	// Calling Callback after receiving services in JSON
		}
	});
};

/**
  * Makes AJAX request to LongURL API to get all supported shorl url services
  */
_es.getLongURL = function(link, callback) {
	var apiurl = 'http://api.longurl.org/v2/expand?',
		request = 'url=' + encodeURIComponent(link) +
			'&title=1' +		// Also get title to replace link's innerHTML
			'&format=json';

	$.ajax({
		url: apiurl + request,
		dataType: 'json',
		success: function(data) {
			if(data["type"]!="error") {
				data.short = link;
				callback(data);		// Calling Callback after getting long url
			}
		}
	});
};

/**
  * Make AJAX request to https site to see if status is ok
  */
_es.checkHTTPS = function(link, callback) {

	//request headers only
	$.ajax({
		type: "HEAD",
		url: link,
		success: function(message, text, response) {

			//200 response means we're in business
			if(response.status=200) {
				
				callback();
			}
		}
	});
}

/**
  * Handle request sent by content scripts
  */
chrome.extension.onRequest.addListener(function(request, sender, callback) {
	// TODO: Replace following if condition by JSON
	if (request.action == 'getLongURL') {
		_es.getLongURL(request.link, callback);
	} else if (request.action == 'getOptions') {
		if (_es.LongURLservices === null) { // Wait that the services list is present
			_es.getLongURLServices(function() { returnOptionsAndServices(request.domain, callback); });
		} else {
			returnOptionsAndServices(request.domain, callback);
		}
	} else if (request.action == 'setOptions') {
		setSetting(request.module, request.option, request.domain);
		callback();
	} else if (request.action == 'checkHTTPS') {

		_es.checkHTTPS(request.link,callback);
	}
});

/**
  * returning options and services to content script
  */
function returnOptionsAndServices(domain, callback) {
	getModules(domain, function (modules) {
		var obj = {
			modules: modules,
			known_services: _es.LongURLservices,
			topDomains: _es.topDomains
		};

		callback(obj);
	});
}

_es.start();





Array.prototype.clone = function() {
	return this.slice(0);
};

function onVersionChanged() {
	$.each(_es.modules, function(index, module) {
		var object = localStorage[module.id];
		if(typeof object === "undefined" || object === null) {
			localStorage[module.id] = true;
		}
	});
}

function getVersion() {
	return chrome.app.getDetails().version;
}

if (getVersion() != localStorage['version']) {
	localStorage['version'] = getVersion();
	onVersionChanged();
}

function getModules(domain, callback) {
	var x = _es.modules.clone();
	
	getDomainSetting(domain, function(dS) {
		for(var i=0; i<x.length; i++) {
			var module = x[i].id;
			var object = localStorage[module];
			if(typeof object !== "undefined" && object !== null) {
				if(object == "false") {
					x[i].enabled = 0;
				} else {
					if(dS[x[i].id] == false)
						x[i].enabled = 1;
					else
						x[i].enabled = 2;
				}
			} else {
				x[i].enabled = 2;
			}
		}
		console.log(x);
		callback(x);
	});
	
}

function getDomainSetting(domain, callback) {
	domains.get(domain, function(ob) {
		if(typeof ob !== "undefined" && ob !== null)
			dS = ob.value;
		else
			dS = {};

		callback(dS);
	});
}

function setSetting(module, option, domain) {
	console.log(module + " : " + option + " : " + domain);
	if(option == 0) {
		localStorage[module] = false;
	} else {
		localStorage[module] = true;
		var value = false;
		if(option == 1) {
			value = false;
		} else {
			value = true;
		}
		domains.get(domain, function(object) {
			var domainObject = {};
			if(typeof object !== "undefined" && object !== null) {
				domainObject = object.value;
			}
			domainObject[module] = value;
			domains.save({key: domain, value: domainObject });
		});
	}
}
