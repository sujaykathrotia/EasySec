var current_domain;

function add_Module(options) {
	console.log(options);
	var el = '<section>' +
		'<label>' + options.title + ':</label>' +
		'<ul id="' + options.id + '" class="toggle">' +
			'<li data-value="2" class="left ' + (options.enabled === 2 ? "selected" : "") + '">On</li>' +
			'<li data-value="1" class="center ' + (options.enabled === 1 ? "selected" : "") + '">Off on this Domain</li>' +
			'<li data-value="0" class="right ' + (options.enabled === 0 ? "selected" : "") + '">Off</li>' +
		'</ul>' +
	'</section>';
	$("#modules").append(el);
}

function popup_start(options) {
	var modules = options.modules;
	for (var i = 0; i < modules.length; i++) {
		add_Module(modules[i]);
	}
}

chrome.tabs.getSelected(null, function(tab) {
	try {
		current_domain = tab.url.match(/^(?:https?:\/\/)?(?:www\.)?((?:[-\w]+\.)+[a-zA-Z]{2,})(\/.+)?/i)[1];
	} catch(e) {
		current_domain = "chrome-url";
	}
	/* Get Options and other parameters from Background */
	chrome.extension.sendRequest({
		action: 'getOptions',
		domain: current_domain
	}, popup_start);
});

$(document).ready(function() {
	$("body").on("click", ".toggle li", function(e) {
		var parent = $(this).parent();
		var value = $(this).attr('data-value');
		var id = parent.attr('id');
		parent.children('li').removeClass('selected');
		$(this).addClass('selected');

		chrome.extension.sendRequest({
			action: 'setOptions',
			domain: current_domain,
			module: id,
			option: value
		}, function (){});
	});
});
