var imgPrefix = "/images/2015/";

function setImage(element) {
	switch(element.innerHTML) {
		case "SPC Outlooks":
			loadTabs("outlooks");
			break;
		case "Radiosondes":
			loadTabs("radiosondes");
			break;
		case "300 mb":
			loadTabs("300mb");
			break;
		case "500 mb":
			loadTabs("500mb");
			break;
		case "700 mb":
			loadTabs("700mb");
			break;
		case '850 mb':
			loadTabs("850mb");
			break;
		case "925 mb":
			loadTabs("925mb");
			break;
		case "Surface":
			removeTabs();
			var loadsrc = imgPrefix + "surface/18.gif";
			loadImage(loadsrc);
			break;
		case "Visible":
			loadTabs("1kmv");
			break;
		case "Infrared":
			loadTabs("ir");
			break;
		case "Water Vapor":
			loadTabs("wv");
			break;
		case "SB CAPE/CIN":
			loadTabs("sbcp");
			break;
		case "Shear Vector":
			loadTabs("shr6");
			break;
		case "SRH/Motion":
			loadTabs("srh3");
			break;
		case "TOR/MLCIN":
			loadTabs("stpc");
			break;
	};
};

function loadTabs(category) {
	switch (category) {
		case "outlooks":
			removeTabs();
			$("#tabArea").html( '' +
						'<ul class="nav nav-tabs" style="margin-bottom: 15px;">' +
				  		'<li><a href="#" data-toggle="tab" id="cat">Categorical</a></li>' +
				  		'<li><a href="#" data-toggle="tab" id="tor">Tornado</a></li>' +
				  		'<li><a href="#" data-toggle="tab" id="hail">Hail</a></li>' +
				  		'<li><a href="#" data-toggle="tab" id="wind">Wind</a></li>' +
				  		'<li><a href="#" data-toggle="tab" id="disc">Mesoscale Discussion</a></li>' +
					'</ul>'
			);
			$("#tabArea").find("a").each(function(i, element) {
				var loadcall = "loadImage('" + imgPrefix  + category + "/" + element.id + ".gif')";
				element.setAttribute('onclick', loadcall);
			});
			break;
		case "radiosondes":
			removeTabs();
			$("#tabArea").html( '' +
						'<ul class="nav nav-tabs" style="margin-bottom: 15px;">' +
				  		'<li><a href="#" data-toggle="tab" id="jan">JAN</a></li>' +
				  		'<li><a href="#" data-toggle="tab" id="lix">LIX</a></li>' +
					'</ul>'
			);
			$("#tabArea").find("a").each(function(i, element) {
				var loadcall = "loadImage('" + imgPrefix  + category + "/" + element.id + ".gif')";
				element.setAttribute('onclick', loadcall);
			});
			break;
		default:
			removeTabs();
			$("#tabArea").html( '' +
						'<ul class="nav nav-tabs" style="margin-bottom: 15px;">' +
				  		'<li><a href="#" data-toggle="tab">16 Z</a></li>' +
				  		'<li><a href="#" data-toggle="tab">17 Z</a></li>' +
				  		'<li><a href="#" data-toggle="tab">18 Z</a></li>' +
				  		'<li><a href="#" data-toggle="tab">19 Z</a></li>' +
				  		'<li><a href="#" data-toggle="tab">20 Z</a></li>' +
				  		'<li><a href="#" data-toggle="tab">21 Z</a></li>' +
				  		'<li><a href="#" data-toggle="tab">22 Z</a></li>' +
					'</ul>'
			);
			$("#tabArea").find("a").each(function(i, element) {
				var loadcall = "loadImage('" + imgPrefix + category + "/" + element.innerHTML.substring(0,2) + "_" + category + ".gif')";
				element.setAttribute('onclick', loadcall);
			});
			break;
	};
};

function removeTabs() {
	$("#tabArea").html('');
	$("#image").attr("src","");
};

function loadImage(src) {
	console.log(src)
	$("#image").attr("src", src);
};

$("#ancillary").find("a").each(function(i, element) {
	element.setAttribute('onclick', 'setImage(this)');
});
