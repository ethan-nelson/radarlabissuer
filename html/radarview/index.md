---
layout: page
title: Radar View
---
<center>

<div class="row">
<input type="checkbox" id="synctime" />
<label for="synctime">Sync Time in Windows</label>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="checkbox" id="synctilt" />
<label for="synctilt">Sync Tilt in Windows</label>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="checkbox" id="syncpan" />
<label for="syncpan">Sync Panning/Zooming in Windows</label>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div id='addTime'></div><div id='update'></div>
</div>

<br />
<div class="row" style="display: flex; justify-content: center;">

<div>
<div>
<input class="btn btn-default" id='map1Z' value="Z" type="button" data-toggle="button" onClick="switchProduct('map1', 'reflectivity');" />
<input class="btn btn-default" id='map1V' value="V" type="button" data-toggle="button" onClick="switchProduct('map1', 'velocity');" />
<input class="btn btn-default" id='map1Zdr' value="Zdr" type="button" data-toggle="button" onClick="switchProduct('map1', 'differential_reflectivity');" />
<input class="btn btn-default" id='map1sigma' value="CC" type="button" data-toggle="button" onClick="switchProduct('map1', 'cross_correlation_ratio');" />
<input class="btn btn-default" id='map1Kdp' value="Kdp" type="button" data-toggle="button" onClick="switchProduct('map1', 'specific_differential_phase');" />
<label> Tilt:</label>
<input class="btn btn-default" value="-" type="button" onClick="subTilt('tilt1'); syncTilt('tilt1', 'tilt2'); switchImage('map1');" />
<input min="0" max="4" value="0" type="range" style="width: 60px; display: inline !important;" id='tilt1' onChange="syncTilt('tilt1', 'tilt2');" />
<input class="btn btn-default" value="+" type="button" onClick="addTilt('tilt1'); syncTilt('tilt1', 'tilt2'); switchImage('map1');" />
<label> Time:</label>
<input class="btn btn-default" value="-" type="button" onClick="subTime('time1'); syncTime('time1', 'time2'); switchImage('map1');" />
<input min="0" max="0" type="range" style="width: 60px; display: inline !important;" id='time1' onChange="syncTime('time1', 'time2');" />
<input class="btn btn-default" value="+" type="button" onClick="addTime('time1'); syncTime('time1', 'time2'); switchImage('map1');" />
</div>
<div><span id="map1Time"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>Cursor: <span id="latlon1">LAT/LON</span></span></div>
<div id="map1" style="height: 550px; width: 525px;"></div>
</div>

<div style="width: 20px;"></div>

<div>
<div>
<input class="btn btn-default" id='map2Z' value="Z" type="button" data-toggle="button" onClick="switchProduct('map2', 'reflectivity');" />
<input class="btn btn-default" id='map2V' value="V" type="button" data-toggle="button" onClick="switchProduct('map2', 'velocity');" />
<input class="btn btn-default" id='map2Zdr' value="Zdr" type="button" data-toggle="button" onClick="switchProduct('map2', 'differential_reflectivity');" />
<input class="btn btn-default" id='map2sigma' value="CC" type="button" data-toggle="button" onClick="switchProduct('map2', 'cross_correlation_ratio');" />
<input class="btn btn-default" id='map2Kdp' value="Kdp" type="button" data-toggle="button" onClick="switchProduct('map2', 'specific_differential_phase');" />
<label> Tilt:</label>
<input class="btn btn-default" value="-" type="button" onClick="subTilt('tilt2'); syncTilt('tilt2', 'tilt1'); switchImage('map2');" />
<input min="0" max="4" value="0" type="range" style="width: 60px; display: inline !important;" id='tilt2' onChange="syncTilt('tilt2', 'tilt1');" />
<input class="btn btn-default" value="+" type="button" onClick="addTilt('tilt2'); syncTilt('tilt2', 'tilt1'); switchImage('map2');" />
<label> Time:</label>
<input class="btn btn-default" value="-" type="button" onClick="subTime('time2'); syncTime('time2', 'time1'); switchImage('map2');" />
<input min="0" max="0" type="range" style="width: 60px; display: inline !important;" id='time2' onChange="syncTime('time2', 'time1');" />
<input class="btn btn-default" value="+" type="button" onClick="addTime('time2'); syncTime('time2', 'time1'); switchImage('map2');" />
</div>
<div><span id="map2Time"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>Cursor: <span id="latlon2">LAT/LON</span></span></div>
<div id="map2" style="height: 550px; width: 525px;"></div>
</div>

</div>
</center>

<script src="{{ '/vendor/Leaflet.omnivore/leaflet-omnivore.min.js' | prepend: site.baseurl }}"></script>
<script src="{{ '/js/common.js' | prepend: site.baseurl }}"></script>
<script src="{{ '/js/radarview.js' | prepend: site.baseurl }}"></script>
