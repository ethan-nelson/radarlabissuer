---
layout: page
title: Review Warnings
slug: /review
---
<script src="{{ '/js/common.js' | prepend: site.baseurl }}"></script>
<script>
var mapper = [];

function ExpandAll() {
  $('#accordian .panel-collapse').collapse('show');
}

function CollapseAll() {
  $('#accordian .panel-collapse').collapse('hide');
}

var radarimages = ['192127.png',
'192508.png',
'192849.png',
'193257.png',
'193652.png',
'194116.png',
'194553.png',
'195044.png',
'195520.png',
'200012.png',
'200438.png',
'200905.png',
'201338.png',
'201825.png',
'202313.png',
'202807.png',
'203325.png',
'203815.png',
'204310.png',
'204758.png',
'205246.png',
'205728.png',
'210209.png',
'210650.png',
'211145.png',
'211719.png',
'212237.png',
'213003.png',
'213522.png',
'214040.png',
'214612.png',
'215134.png',
'215658.png'];

var delayedTimes = {
    '233506': '23:35:06Z',
    '234130': '23:41:30Z',
    '234827': '23:48:27Z',
    '235524': '23:55:24Z',
    '000221': '00:02:21Z',
    '000853': '00:11:53Z',
    '001527': '00:22:27Z',
    '002153': '00:33:53Z',
    '002830': '00:44:30Z',
    '003453': '00:55:53Z',
    '004137': '01:06:37Z',
    '004833': '01:17:33Z',
    '005520': '01:28:20Z',
    '010215': '01:39:15Z',
    '010910': '01:50:10Z',
};



function updateradar(y) {
var quantity = document.getElementById('radarimage').value;

for ($x = 0; $x < document.getElementsByClassName("mapdisplay").length; $x++) {
  mapper[$x].removeLayer(radimg[$x]);
  currentFile = getFile('reflectivity', '0.5', radarKeys[quantity]);
  radimg[$x] = L.imageOverlay(currentFile, {{ site.radarbounds }}, {opacity: 0.5});
  mapper[$x].addLayer(radimg[$x]);
  radimg[$x].bringToBack();
}  
document.getElementById('radarlabel').value = delayedTimes[radarKeys[quantity]];

};
var radimg = [];

function PostData(y) {
        try {
	    var x = document.forms["warning"]["forecasterNumber"].value;
        }
        catch(err) {
            var x = y;
        }
	if (x == null || x == "") {
		alerthtml = '<div class="alert alert-warning" role="alert"><strong>Oh snap!</strong> ' +
					'Please enter your forecaster number. See your TA if you do not know it.</div>';
		document.getElementById('alertarea').innerHTML = alerthtml
		return false;
	}
	var $btn = $('#forecasterNumberbtn').button('loading')
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        throw new Error("Ajax is not supported by this browser");
    }

    try {
	var forecasternumber = document.getElementById("forecasterNumber").value;
    }
    catch(err) {
        var forecasternumber = y;
    }

    xhr.open('POST', '{{ "/review/retrieve.php" | prepend: site.baseurl }}');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("forecasternumber=" + forecasternumber);

  	xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) {
				$btn.button('reset');
                document.getElementById('everything').innerHTML = xhr.responseText;
				var divname;
				for ($x = 0; $x < document.getElementsByClassName("mapdisplay").length; $x++) {
					divname = 'map' + $x;
					var mapimg = L.tileLayer('{{ site.mapdir }}', {
						maxZoom: 12,
						minZoom: 6,
						attribution: '<a href="javascript:attribution()">Map Attributions</a>'
					});
                                        radimg[$x] = L.imageOverlay('/images/radar/latest.png',[[32.425,-100.85],[38.25,-93.75]], {opacity: 0.5});
					mapper[$x] = L.map(divname,{layers: [mapimg,radimg[$x]]}).setView({{ site.mapcenter }}, {{ site.mapzoom }});
					divname = 'coord' + $x;
					jsoncoll = JSON.parse((document.getElementById(divname).innerHTML).replace(/\\/g, ''))
					L.geoJson(jsoncoll).addTo(mapper[$x]);
				}
				$('#accordian').on('shown.bs.collapse', function () {
					for ($x = 0; $x < document.getElementsByClassName("mapdisplay").length; $x++) {
						mapper[$x].invalidateSize();
					}
				})
				$('#accordian').on('hide.bs.collapse', function () {
					for ($x = 0; $x < document.getElementsByClassName("mapdisplay").length; $x++) {
						mapper[$x].invalidateSize();
					}
				})

            } else {
					responsehtml = '<div class="alert alert-dismissable alert-danger">' +
                	'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
        			'<h4><strong>ERROR!</strong></h4> Error retrieving. ' +
					' CALL TECH SUPPORT (AKA your TA) NOW!</div>';
                	document.getElementById('everything').innerHTML = responsehtml
			}
        }
    }
}

</script>

<div id="everything">
<div id="alertarea"></div>
<form name="warning" class="form-inline" id="reviewwarnings" onSubmit="PostData(); return false;">
	<fieldset>

      <div class="form-group">
        <label class="control-label" for="forecasterNumber">Forecaster #:</label>
        <input class="form-control" id="forecasterNumber" type="text" name="forecasterNumber">
      </div>

		<input class="btn btn-default" value="Review Warnings" type="submit" data-loading-text="Looking up..." name="forecasterNumberbtn" id="forecasterNumberbtn">
	</fieldset>
</form>


</div>

