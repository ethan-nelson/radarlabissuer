---
---
var times = {'time1': document.getElementById('time1'),
             'time2': document.getElementById('time2')};
var tilts = {'tilt1': document.getElementById('tilt1'),
             'tilt2': document.getElementById('tilt2')};
var map1Buttons = [document.getElementById('map1Z'),
                  document.getElementById('map1V'),
                  document.getElementById('map1Zdr'),
                  document.getElementById('map1sigma')];
var map2Buttons = [document.getElementById('map2Z'),
                   document.getElementById('map2V'),
                   document.getElementById('map2Zdr'),
                   document.getElementById('map2sigma')];

// Decrement
function subTilt(element) {
    tilts[element].stepDown();
}
function subTime(element) {
    times[element].stepDown();
}

// Increment
function addTilt(element) {
    tilts[element].stepUp();
}
function addTime(element) {
    times[element].stepUp();
}


// Sync times
var synctime = document.getElementById('synctime');
function syncTime(current, other) {
    if (synctime.checked === true) {
        times[other].value = times[current].value;
    }
}

// Sync tilts
var synctilt = document.getElementById('synctilt');
function syncTilt(current, other) {
    if (synctilt.checked === true) {
        tilts[other].value = tilts[current].value;
    }
}

// Sync pan
var syncpan = document.getElementById('syncpan');

function sync(map, e) {
    map.setView(e.target.getCenter(), e.target.getZoom(), {
    });
}

function follow(e) {
    if (syncpan.checked === false) {
        return
    } else {
        if (e.target === map1) {
            sync(map2, e);
        } else {
            sync(map1, e);
        }
    }
}

// Image retrieval
function getFile(product, tilt, time) {
  return '/radarlabissuer/images/radar/' + product + '/' + time + '_' + product + '.png'
}

// Product selection
function initializeProducts() {
    map1Layer = new L.ImageOverlay(getFile('reflectivity', '0.0', 'latest'), {{ site.radarbounds }}, {opacity: 0.5});
    map1Layer.addTo(map1);
    map2Layer = new L.ImageOverlay(getFile('velocity', '0.0', 'latest'), {{ site.radarbounds }}, {opacity: 0.5});
    map2Layer.addTo(map2);
}

function switchProduct(inmap, product, tilt, time) {
    if (inmap === 'map1') {
        map1.removeLayer(map1Layer);
        for (var i = 0; i < 4; i++) {
            map1Buttons[i].classList.remove('active');
        }
        map1Layer = new L.ImageOverlay(getFile(product, tilt, time), {{ site.radarbounds }}, {opacity: 0.5});
        map1.addLayer(map1Layer);
    } else {
        map2.removeLayer(map2Layer);
        for (var i=0; i < 4; i++) {
            map2Buttons[i].classList.remove('active');
        }
        map2Layer = new L.ImageOverlay(getFile(product, tilt, time), {{ site.radarbounds }}, {opacity: 0.5});
        map2.addLayer(map2Layer);
    }
}


var map1 = L.map('map1', {layers: [mapimg]}).setView({{ site.mapcenter}}, {{ site.mapzoom }});

var map2 = L.map('map2', {layers: [mapimg2]}).setView({{ site.mapcenter}}, {{ site.mapzoom }});

map1.on('moveend', follow).on('zoomend', follow);
map2.on('moveend', follow).on('zoomend', follow);

initializeProducts();
