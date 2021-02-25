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
jsonLayer = loadReports();
refreshForever();
