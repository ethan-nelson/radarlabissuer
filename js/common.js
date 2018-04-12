---
---
var imgPrefix = "{{ site.baseurl }}{{ site.imagedir }}";

{% if site.attribution %}
function attribution (){
    window.alert("{{ site.attribution }}");
}
{% else %}
function attribution () {};
{% endif %}

var mapimg = L.tileLayer('{{ site.mapdir }}', {maxZoom: 12, minZoom: 6, attribution: '<a href="javascript: attribution()">Map Attributions</a>'});

var radarimg = L.imageOverlay('{{ site.radarimg }}', {{ site.radarbounds }}, {opacity: 0.5});

function reloadRadar() {
    map.removeLayer(radarimg);
    image = '{{ site.radarimg }}?lastmod' + new Date().getTime();
    radarimg = new L.ImageOverlay(image, {{ site.radarbounds }}, {opacity: 0.5});
    map.addLayer(radarimg);
    radarimg.bringToBack();
}


// Pad time strings with a leading zero.
function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


// Get the simulation time and display it on the page.
function getTime() {
    var today=new Date();
    today.setHours(today.getHours() + {{ site.houroffset }});
    today.setMinutes(today.getMinutes() + {{ site.minuteoffset }});
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('addTime').innerHTML = "Simulation Time: " + h+":"+m+":"+s;
    document.getElementById('radartime').value = h+":"+m;
    var t = setTimeout(function(){getTime()},500);
}


window.onload = getTime();
