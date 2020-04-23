---
---
// Load and parse warnings
function loadWarnings() {
    var jsonLayer = new L.geoJson(null);
    var warningsFile = "/radarlabissuer/admin/data.php";
    var warningsLayer = omnivore.geojson(warningsFile, null, jsonLayer);
    warningsLayer.addTo(map);
    return jsonLayer;
}


// Reload warning and radar layers
function reloadLayers() {
    jsonLayer.clearLayers();
    reloadRadar();
    jsonLayer = loadWarnings();
}


// Refresh the layers forever
function refreshForever() {
    setInterval(function() {reloadLayers()}, 15000);
}


var map = L.map('map', {layers: [mapimg, radarimg]}).setView({{ site.mapcenter}}, {{ site.mapzoom }});
jsonLayer = loadWarnings();
refreshForever();
