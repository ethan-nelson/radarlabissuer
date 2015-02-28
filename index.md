---
layout: page
title: Warning Generator
---
<script>

function ResetData(Form) {
	var frm_elements = Form.elements;
	for (i = 0; i < frm_elements.length; i++)
	{
		field_type = frm_elements[i].type.toLowerCase();
		switch (field_type)
		{
		case "text":
		case "password":
		case "textarea":
		case "hidden":
			frm_elements[i].value = "";
			break;
		case "radio":
		case "checkbox":
			if (frm_elements[i].checked)
			{
				frm_elements[i].checked = false;
			}
			break;
		case "select-one":
		case "select-multi":
			frm_elements[i].selectedIndex = -1;
			break;
		default:
			break;
		}
	}
	map.removeLayer(drawnWarning);
	drawnWarning = new L.FeatureGroup();
	polygonid = JSON.stringify(drawnWarning.toGeoJSON());
	map.addLayer(drawnWarning);
	onlyeditControl.removeFrom(map);

	options = {
		draw: {
		    polyline: false,
			rectangle: false,
			circle: false,
		    marker: false
		},
		edit: {
		    featureGroup: drawnWarning
		}
	};

	onlyeditoptions = {
		draw: false,
		edit: {
			featureGroup: drawnWarning
		}
	};

	drawControl = new L.Control.Draw(options);
	onlyeditControl = new L.Control.Draw(onlyeditoptions);
	map.addControl(drawControl);

};
function PostData(Form) {
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
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) {
				responsehtml = '<div class="alert alert-dismissable alert-success">' +
                               '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
        					   '<h4><i class="glyphicon glyphicon-ok"></i><strong> Storm warning issued!</strong></h4>' +
							   'Issued for a ' + xhr.responseText + '</div>';
                document.getElementById('returnvalue').innerHTML = responsehtml;
				ResetData(Form);
            } else {
					responsehtml = '<div class="alert alert-dismissable alert-danger">' +
                	'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
        			'<h4><strong>ERROR!</strong></h4> Error issuing storm warning. Try submitting again.<br>' +
					' IF IT DOESN`T WORK AGAIN CALL TECH SUPPORT (AKA your TA) NOW!</div>';
                	document.getElementById('returnvalue').innerHTML = responsehtml;
			}
        }
    }

	var forecasterid = document.getElementById("forecaster").value;
    var warningid = document.getElementById("warning").value;
	var threatid = document.getElementById("threat").value;
	var magnitudeid = document.getElementById("warningmagnitude").value;
	var sourceid = document.getElementById("source").value;
	var radarid = document.getElementById("timepickerradar").value;
	var expirationid = document.getElementById("timepickerexpiration").value;
	var directionid = document.getElementById("direction").value;
	var speedid = document.getElementById("speed").value;
    var infoid = document.getElementById("info").value;
	var polygonid = JSON.stringify(drawnWarning.toGeoJSON());

    xhr.open('POST', '/warn/issue.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("forecaster=" + forecasterid + "&label=" + warningid + "&threat=" + threatid + "&magnitude=" + magnitudeid +
			"&source=" + sourceid + "&radartime=" + radarid + "&expirationtime=" + expirationid +
			"&direction=" + directionid + "&speed=" + speedid + "&polygon=" + polygonid + "&info=" + infoid);
}
</script>

<div id="returnvalue"></div>
<div class="well bs-component col-xs-16">
<form class="form-horizontal" id="stormwarning">
	<fieldset>
	<center><legend><h3>Storm Warning Issuer</h3></legend></center>
	<div class="row">
	<div class="col-xs-6 column">

	<div class="form-group">
		<label for="forecaster" class="col-lg-2 control-label">Forecaster:</label>
		<div class="col-lg-6">
			<input type="text" class="form-control" id="forecaster">
		</div>
	</div>

	<div class="form-group">
		<label for="select" class="col-lg-2 control-label">Type:</label>
		<div class="col-lg-6">
		  <select class="form-control" id="warning">
			<option></option>
			<option>Severe Storm</option>
			<option>Tornado</option>
		  </select>
		</div>
	</div>

	<div class="form-group">
		<label for="select" class="col-lg-2 control-label">Threat:</label>
		<div class="col-lg-6">
		  <select class="form-control" id="threat">
			<option></option>
			<option>Severe Wind</option>
			<option>Severe Hail</option>
		  </select>
		</div>
	</div>

	<div class="form-group">
		<label for="input" class="col-lg-2 control-label">Magnitude:</label>
		<div class="col-lg-6">
			<div class="input-group">
				<input type="text" class="form-control" id="warningmagnitude">
				<div class="input-group-addon" id="magnitudeaddon"></div>
			</div>
		</div>
	</div>

	<div class="form-group">
		<label for="select" class="col-lg-2 control-label">Source:</label>
		<div class="col-lg-6">
		  <select class="form-control" id="source">
			<option></option>
			<option>Dopper radar indication</option>
			<option>Trained storm spotter</option>
			<option>Law enforcement</option>
			<option>Media</option>
			<option>Automated weather station</option>
		  </select>
		</div>
	</div>

	<div class="form-group">
		<label for="input" class="col-lg-2 control-label">Radar Time:</label>
		<div class="input-append bootstrap-timepicker col-lg-6">
			<input type="text" name="radar_time" id="timepickerradar">
			<span class="add-on"><i class="glyphicon glyphicon-time"></i></span>
		</div>
	</div>

	<div class="form-group">
		<label for="input" class="col-lg-2 control-label">Expiration:</label>
		<div class="input-append bootstrap-timepicker col-lg-6">
			<input type="text" name="expiration_time" id="timepickerexpiration">
			<span class="add-on"><i class="glyphicon glyphicon-time"></i></span>
		</div>
	</div>

	<div class="form-group">
		<label for="select" class="col-lg-2 control-label">Movement:</label>
		<div class="col-lg-3">
		  <select class="form-control" id="direction">
			<option></option>
			<option>N</option>
			<option>NNE</option>
			<option>NE</option>
			<option>ENE</option>
			<option>E</option>
			<option>ESE</option>
			<option>SE</option>
			<option>SSE</option>
			<option>S</option>
			<option>SSW</option>
			<option>SW</option>
			<option>WSW</option>
			<option>W</option>
			<option>WNW</option>
			<option>NW</option>
			<option>NNW</option>
			<option>N</option>
		  </select>
		</div>
		<div class="col-lg-2 input-group">
			<input type="text" class="form-control" id="speed">
			<div class="input-group-addon">kts</div>
		</div>
	</div>

	<div class="form-group">
		<label for="textArea" class="col-lg-2 control-label">Details:</label>
		<div class="col-lg-8">
			<textarea class="form-control" rows="4" id="info"></textarea>
		</div>
	</div>
	</div>
	<div class="col-xs-6 column">
		<label>Draw the warning polygon:</label>
		<div id="map" style="height: 350px; width: 500px;"></div>

	</div>
	</div>
	<div class="row">
	<div class="form-group">
		<div class="col-lg-offset-5">
			<input class="btn btn-default" value="Reset Values" type="button" onClick="ResetData(this.form)">
			<input class="btn btn-danger" value="Issue Warning" type="button" onClick="PostData(this.form)">
		</div>
	</div>

	</fieldset>
	</div>
</form>

<script type="text/javascript">
	$('#timepickerexpiration').timepicker({
		minuteStep: 1,
		defaultTime: false,
		showMeridian: false
	});

	$('#timepickerradar').timepicker({
		minuteStep: 1,
		defaultTime: false,
		showMeridian: false
	});

	var $warning = $('#warning'), $magnitude = $('#warningmagnitude'), $threat = $('#threat'), $magnitudeaddon = $('#magnitudeaddon');
	$warning.change(function () {
		if ($warning.val() == 'Severe Storm') {
		    $magnitude.removeAttr('disabled');
			$threat.removeAttr('disabled');
		} else {
			$magnitude.attr('disabled','disabled').val('');
			$threat.attr('disabled','disabled').val('');
			$magnitudeaddon.html('');
		}
	}).trigger('change');

	$threat.change(function () {
		if ($threat.val() == 'Severe Wind') {
		    $magnitudeaddon.html('kts');
		} else if ($threat.val() == 'Severe Hail') {
			$magnitudeaddon.html('inches');
		} else {
			$magnitudeaddon.html('');
		}
	}).trigger('change');

	var map = L.map('map').setView([0.0,0.0],10);

	var drawnWarning = new L.FeatureGroup();
	var polygonid = JSON.stringify(drawnWarning.toGeoJSON());
	map.addLayer(drawnWarning);

	var options = {
		draw: {
		    polyline: false,
			rectangle: false,
			circle: false,
		    marker: false
		},
		edit: {
		    featureGroup: drawnWarning
		}
	};

	var onlyeditoptions = {
		draw: false,
		edit: {
			featureGroup: drawnWarning
		}
	};

	var drawControl = new L.Control.Draw(options);
	var onlyeditControl = new L.Control.Draw(onlyeditoptions);
	map.addControl(drawControl);

	map.on('draw:created', function (e) {
		layer = e.layer;
		layer.addTo(drawnWarning);
		drawControl.removeFrom(map);
		onlyeditControl.addTo(map)
		polygonid = JSON.stringify(drawnWarning.toGeoJSON());
	});

	map.on('draw:edited', function (e) {
		polygonid = JSON.stringify(drawnWarning.toGeoJSON());
	});

	map.on('draw:deleted', function (e) {
		onlyeditControl.removeFrom(map);
		drawControl.addTo(map);
		polygonid = JSON.stringify(drawnWarning.toGeoJSON());
	});

</script>
</div>
