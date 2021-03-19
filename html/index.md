---
layout: page
title: Warning Generator
slug: home
---
<div id="returnvalue"></div>
<div class="well bs-component col-md-12">
<form class="form-horizontal" id="stormwarning">
    <fieldset>
        <center><legend><h3>Storm Warning Issuer</h3></legend></center>
	<div class="row">
	<div class="col-md-6 column">

	<div class="form-group">
		<label for="forecaster" class="col-xs-3 control-label">Forecaster #:</label>
		<div class="col-xs-6">
			<input type="text" class="form-control" id="forecaster" name="forecaster" autofocus required>
		</div>
	</div>

	<div class="form-group">
		<label for="select" class="col-xs-3 control-label">Type:</label>
		<div class="col-xs-6">
		  <select class="form-control" id="type" name="type" required>
			<option></option>
			<option>Severe Storm</option>
			<option>Flash Flood</option>
			<option>Tornado</option>
		  </select>
		</div>
	</div>

	<div class="form-group">
		<label for="select" class="col-xs-3 control-label">Threat:</label>
		<div class="col-xs-6">
		  <select class="form-control" id="threat" name="threat">
			<option val=""></option>
			<option>Severe Wind</option>
			<option>Severe Hail</option>
		  </select>
		</div>
	</div>

	<div class="form-group">
		<label for="input" class="col-xs-3 control-label">Magnitude:</label>
		<div class="col-xs-4">
			<div class="input-group">
				<input type="text" class="form-control" id="magnitude" name="magnitude">
				<div class="input-group-addon" id="magnitudeaddon"></div>
			</div>
		</div>
	</div>

	<div class="form-group">
		<label for="select" class="col-xs-3 control-label">Source:</label>
		<div class="col-xs-6">
		  <select class="form-control" id="source" name="source" required>
			<option val=""></option>
			<option>Dopper radar indication</option>
			<option>Trained storm spotter</option>
			<option>Law enforcement</option>
			<option>Media</option>
			<option>Automated weather station</option>
		  </select>
		</div>
	</div>

	<div class="form-group">
		<label for="input" class="col-xs-3 control-label">Issue Time:</label>
		<div class="input-append bootstrap-timepicker col-xs-6">
			<input type="text" name="radartime" id="radartime" required disabled>
			<span class="add-on"><i class="glyphicon glyphicon-time"></i></span>
		</div>
	</div>

	<div class="form-group">
		<label for="input" class="col-xs-3 control-label">Expiration:</label>
		<div class="input-append bootstrap-timepicker col-xs-6">
			<input type="text" name="expirationtime" id="expirationtime" required>
			<span class="add-on"><i class="glyphicon glyphicon-time"></i></span>
		</div>
	</div>

	<div class="form-group">
		<label for="select" class="col-xs-3 control-label" style="font-weight: normal !important;">Movement:</label>
		<div class="col-xs-3">
		  <select class="form-control" id="direction" name="direction">
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
		<div class="col-xs-2 input-group">
			<input type="text" class="form-control" id="speed" name="speed">
			<div class="input-group-addon">kts</div>
		</div>
	</div>

	<div class="form-group">
		<label for="textArea" class="col-xs-3 control-label">Details:</label>
		<div class="col-xs-8">
			<textarea class="form-control" rows="4" id="details" name="details"></textarea>
		</div>
	</div>
	</div>
	<div class="col-md-6 column">
		<div id="addTime"></div>
		<label>Draw the warning polygon</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>Cursor: <span id="latlon">LAT/LON</span></span></p>
		<div id="map" style="height: 400px; width: 475px;" name="map"></div>
		<div>
			<p class="text-muted small"><em>Map acting weird?</em> <button type="button" class="btn btn-default btn-xs" onClick="ResetMap();">
			<span class="glyphicon glyphicon-retweet" aria-hidden="true"></span> Reset Map</button>
			<button type="button" class="btn btn-default btn-xs" onClick="reloadRadar();">Refresh Radar Manually</button></p>
		</div>
	</div>
	</div>
	<div class="row">
	<div class="form-group">
		<div class="col-xs-offset-5">
			<input class="btn btn-default" value="Reset Everything" type="button" onClick="ResetData();">
			<input class="btn btn-danger" value="Issue Warning" type="submit" id="submitter" name="submitter" data-loading-text='Issuing...' disabled>
		</div>
	</div>
        </fieldset>
    </div>
</form>

<script src="{{ '/vendor/Bootstrap/js/bootstrap-timepicker.js' | prepend: site.baseurl }}"></script>
<script src="{{ '/vendor/Leaflet.draw/leaflet.draw.js' | prepend: site.baseurl }}"></script>

<script src="{{ '/js/common.js' | prepend: site.baseurl }}"></script>
<script src="{{ '/js/warn.js' | prepend: site.baseurl }}"></script>
</div>
