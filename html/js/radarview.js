---
---

var delayedTimes = {
'233506': '233506',
'234130': '234130',
'234827': '234827',
'235524': '235524',
'000221': '000221',
'000853': '001153',
'001527': '002227',
'002153': '003353',
'002830': '004430',
'003453': '005553',
'004137': '010637',
'004833': '011733',
'005520': '012820',
'010215': '013915',
'010910': '015010',
};

var angles = [
'0.5',
'2.4',
'5.1',
'6.4',
'12.5'
];

// Update the time sliders when new radar comes in
function updateTimeSliders() {
    if (JSON.stringify(availableTimes) != JSON.stringify(sliderTimes)) {
        console.log('updating sliders');
        for (var key in times) {
            times[key].setAttribute('max', availableTimes.length-1);
            times[key].value = availableTimes.length - 1;
        }
        switchImage('map1');
        switchImage('map2');
        console.log('updating radar images--new ones available!');
        sliderTimes = availableTimes;
    }
}


function reloadLayers() {
    validateTimes();
    updateTimeSliders();
}


// Refresh the layers forever
function refreshForever() {
    setInterval(function() {reloadLayers()}, 15000);
}

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
        switchImage(other);
    }
}


// Sync tilts
var synctilt = document.getElementById('synctilt');
function syncTilt(current, other) {
    if (synctilt.checked === true) {
        tilts[other].value = tilts[current].value;
        switchImage(other);
    }
}

// Get time
function getSelectedTime(e) {
    return availableTimes[times[e].value];
}

// Get tilt
function getSelectedTilt(e) {
    return angles[tilts[e].value];
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


function switchImage(inmap) {
    if (inmap === 'map1') {
        map1.removeLayer(map1Layer);
        map1Layer = new L.ImageOverlay(getFile(map1Product, getSelectedTilt('tilt1'), getSelectedTime('time1')), {{ site.radarbounds }}, {opacity: 0.5});
        map1Layer.addTo(map1);
        var thetimehere = delayedTimes[getSelectedTime('time1')];
        document.getElementById('map1Time').innerHTML = 'Displayed Radar Tilt ' + getSelectedTilt('tilt1') + '&#176;, Time ' + thetimehere.slice(0,2) + ':' + thetimehere.slice(2,4) + 'Z';
    } else {
        map2.removeLayer(map2Layer);
        map2Layer = new L.ImageOverlay(getFile(map2Product, getSelectedTilt('tilt2'), getSelectedTime('time2')), {{ site.radarbounds }}, {opacity: 0.5});
        map2Layer.addTo(map2);
        var thetimehere = delayedTimes[getSelectedTime('time2')];
        document.getElementById('map2Time').innerHTML = 'Displayed Radar Tilt ' + getSelectedTilt('tilt2') + '&#176;, Time ' + thetimehere.slice(0,2) + ':' + thetimehere.slice(2,4) + 'Z';
    }
}

var map1Product = '';
var map2Product = '';
// Product selection
function initializeProducts() {
    map1Layer = new L.ImageOverlay(getFile('reflectivity', '0.5', 'latest'), {{ site.radarbounds }}, {opacity: 0.5});
    map1Product = 'reflectivity';
    map1Layer.addTo(map1);
    map1Buttons[0].classList.add('active');
    map2Layer = new L.ImageOverlay(getFile('velocity', '0.5', 'latest'), {{ site.radarbounds }}, {opacity: 0.5});
    map2Product = 'velocity';
    map2Layer.addTo(map2);
    map2Buttons[1].classList.add('active');
}

function switchProduct(inmap, product) {
    if (inmap === 'map1') {
        map1.removeLayer(map1Layer);
        for (var i = 0; i < 4; i++) {
            map1Buttons[i].classList.remove('active');
        }
        map1Layer = new L.ImageOverlay(getFile(product, getSelectedTilt('tilt1'), getSelectedTime('time1')), {{ site.radarbounds }}, {opacity: 0.5});
        map1Product = product;
        map1.addLayer(map1Layer);
    } else {
        map2.removeLayer(map2Layer);
        for (var i=0; i < 4; i++) {
            map2Buttons[i].classList.remove('active');
        }
        map2Layer = new L.ImageOverlay(getFile(product, getSelectedTilt('tilt2'), getSelectedTime('time2')), {{ site.radarbounds }}, {opacity: 0.5});
        map2Product = product;
        map2.addLayer(map2Layer);
    }
}

var map1 = L.map('map1', {layers: [mapimg]}).setView({{ site.mapcenter}}, {{ site.mapzoom }});

var map2 = L.map('map2', {layers: [mapimg2]}).setView({{ site.mapcenter}}, {{ site.mapzoom }});

// Add cursor coordinates above maps
latlon1text = document.getElementById('latlon1');
latlon2text = document.getElementById('latlon2');
map1.on('mousemove', function(e) {
  latlon1text.innerHTML = e.latlng.lat.toFixed(3) + '*N, ' + e.latlng.lng.toFixed(3) + '*E';
});
map2.on('mousemove', function(e) {
  latlon2text.innerHTML = e.latlng.lat.toFixed(3) + '*N, ' + e.latlng.lng.toFixed(3) + '*E';
});
map1.on('mouseleave', function(e) {
  latlon1text.innerHTML = '';
});
map2.on('mouseleave', function(e) {
  latlon2text.innerHTML = '';
});
latlon1text.innerHTML = '';
latlon2text.innerHTML = '';

map1.on('moveend', follow).on('zoomend', follow);
map2.on('moveend', follow).on('zoomend', follow);

initializeProducts();

window.onload = getTime();
reloadLayers();
refreshForever();
