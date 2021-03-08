---
---
// Pad time strings with a leading zero.
function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


var classyear = 2020;
var classmonth = 4;
var classday = 27;
var classdayone = classday + 1;

var radarTimes = {
    '233506': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classday.toString())+"T23:35:06Z"),
    '234130': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classday.toString())+"T23:41:30Z"),
    '234827': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classday.toString())+"T23:48:27Z"),
    '235524': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classday.toString())+"T23:55:24Z"),
    '000221': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T00:02:21Z"),
    '000853': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T00:11:53Z"),
    '001527': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T00:22:27Z"),
    '002153': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T00:33:53Z"),
    '002830': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T00:44:30Z"),
    '003453': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T00:55:53Z"),
    '004137': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T01:06:37Z"),
    '004833': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T01:17:33Z"),
    '005520': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T01:28:20Z"),
    '010215': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T01:39:15Z"),
    '010910': new Date(checkTime(classyear.toString())+"-"+checkTime(classmonth.toString())+"-"+checkTime(classdayone.toString())+"T01:50:10Z")
};

var radarKeys = [];
for (var key in radarTimes) {
    radarKeys.push(key);
}

var hourOffset = {{ site.houroffset }};
var minuteOffset = {{ site.minuteoffset }};
var availableTimes = radarKeys.slice(0,4);
var sliderTimes = [];
var latestTime = radarKeys[0];

var imgPrefix = "{{ site.baseurl }}{{ site.imagedir }}";

// File path construction
function getFile(product, tilt, time) {
    return '{{ site.baseurl }}/{{ site.imagedir }}/radar/' + product + '/' + time + '_' + tilt + '_' + product + '.png'
}

// Check valid radar times compared to now
function validateTimes() {
    fakeNow = new Date();
    fakeNow.setTime(fakeNow.getTime() + (hourOffset*3600*1000) + (minuteOffset*60*1000));
    availableTimes = radarKeys.slice(0,4);
    for (var i=4; i<radarKeys.length; i++) {
        if (fakeNow > radarTimes[radarKeys[i]]) {
            availableTimes.push(radarKeys[i]);
        }
    }
}
validateTimes();

// Get the latest time that has elapsed in fake time
function getLatestTime() {
    fakeNow = new Date();
    fakeNow.setTime(fakeNow.getTime() + (hourOffset*3600*1000) + (minuteOffset*60*1000));
    latestTime = radarKeys[0];
    for (var i=0; i<radarKeys.length; i++) {
        if (fakeNow > radarTimes[radarKeys[i]]) {
            latestTime = radarKeys[i];
        } else {
            break;
	}
    }
}
getLatestTime();


{% if site.attribution %}
function attribution (){
    window.alert("{{ site.attribution }}");
}
{% else %}
function attribution () {};
{% endif %}

var mapimg = L.tileLayer('{{ site.mapdir }}', {maxZoom: 12, minZoom: 6, attribution: '<a href="javascript: attribution()">Map Attributions</a>'});
var mapimg2 = L.tileLayer('{{ site.mapdir }}', {maxZoom: 12, minZoom: 6, attribution: '<a href="javascript: attribution()">Map Attributions</a>'});

var radarimg = L.imageOverlay(getFile('reflectivity', '0.5', latestTime), {{ site.radarbounds }}, {opacity: 0.5});

function reloadRadar() {
    map.removeLayer(radarimg);
    getLatestTime();
    image = getFile('reflectivity', '0.5', latestTime);
    radarimg = new L.ImageOverlay(image, {{ site.radarbounds }}, {opacity: 0.5});
    map.addLayer(radarimg);
    radarimg.bringToBack();
}



// Get the simulation time and display it on the page.
function getTime() {
    var today=new Date();
    today.setTime(today.getTime() + (hourOffset*3600*1000) + (minuteOffset*60*1000));
    document.getElementById('addTime').innerHTML = "Simulation Time: " + today.toLocaleTimeString('en-US', {timeZone: 'UTC'});
    var t = setTimeout(function(){getTime()},500);
}


window.onload = getTime();
