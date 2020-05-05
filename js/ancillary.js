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
			var loadsrc = imgPrefix + "obs/surface/19.png";
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
				  		'<li><a href="#" data-toggle="tab" id="disc1">Mesoscale Discussion 1</a></li>' +
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
                                                '<li><a href="#" data-toggle="tab" id="18Z">DDC 18Z</a></li>' +
				  		'<li><a href="#" data-toggle="tab" id="00Z">OUN 00Z</a></li>' +
					'</ul>'
			);
			$("#tabArea").find("a").each(function(i, element) {
				var loadcall = "loadImage('" + imgPrefix  + category + "/" + element.id + ".gif')";
				element.setAttribute('onclick', loadcall);
			});
			break;
                case "1kmv":
                        removeTabs();
                        $("#tabArea").html( '' +
                                                '<ul class="nav nav-tabs" style="margin-bottom: 15px;">' +
                                                '<li><a href="#" data-toggle="tab">1859 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">1959 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">2045 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">2159 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">2259 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">2345 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">0100 Z</a></li>' +
                                        '</ul>'
                        );
                        $("#tabArea").find("a").each(function(i, element) {
                                var loadcall = "loadImage('" + imgPrefix + "/obs/" + category + "/" + category + "_" + element.innerHTML.substring(0,2) + "00UTC_24may2016.gif')";
                                element.setAttribute('onclick', loadcall);
                        });
                        break;
		default:
			removeTabs();
			$("#tabArea").html( '' +
						'<ul class="nav nav-tabs" style="margin-bottom: 15px;">' +
                                                '<li><a href="#" data-toggle="tab">18 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">19 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">20 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">21 Z</a></li>' +
                                                '<li><a href="#" data-toggle="tab">22 Z</a></li>' +
				  		'<li><a href="#" data-toggle="tab">23 Z</a></li>' +
					'</ul>'
			);
			$("#tabArea").find("a").each(function(i, element) {
				var loadcall = "loadImage('" + imgPrefix + "/obs/" + category + "/" + category + "_" + element.innerHTML.substring(0,2) + "00UTC_24may2016.gif')";
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

function loadVideo(src) {
        console.log(src)
        $("#video").attr("src", src);
};

$("#ancillary").find("a").each(function(i, element) {
	element.setAttribute('onclick', 'setImage(this)');
});
