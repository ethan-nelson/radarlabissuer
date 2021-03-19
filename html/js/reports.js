---
---
// Format storm report popups
function reportInformation(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup('<p>' + feature.properties.time + '</p><p>' + feature.properties.popupContent + '</p>');
    }
}


// Load and parse storm reports
function loadReports() {
    var jsonLayer = new L.geoJson(null, {onEachFeature: reportInformation});
    var reportsFile = "{{ site.reportsfile }}";
    var reportsLayer = omnivore.csv(reportsFile, null, jsonLayer);
    reportsLayer.addTo(map);
    return jsonLayer;
}


// Reload report and radar layers
function reloadLayers() {
    jsonLayer.clearLayers();
    reloadRadar();
    jsonLayer = loadReports();
}


// Refresh the layers forever
function refreshForever() {
    setInterval(function() {reloadLayers()}, 15000);
}


var map = L.map('map', {layers: [mapimg, radarimg]}).setView({{ site.mapcenter}}, {{ site.mapzoom }});

// Add cursor coordinates above map
latlontext = document.getElementById('latlon');
map.on('mousemove', function(e) {
  latlontext.innerHTML = e.latlng.lat.toFixed(3) + '*N, ' + e.latlng.lng.toFixed(3) + '*E';
});
map.on('mouseleave', function(e) {
  latlontext.innerHTML = '';
});
latlontext.innerHTML = '';

jsonLayer = loadReports();
refreshForever();
