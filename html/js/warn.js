---
---
var map = L.map('map', {layers: [mapimg, radarimg]}).setView({{ site.mapcenter}}, {{ site.mapzoom }});

$('#radartime').timepicker({
    minuteStep: 1,
    defaultTime: '{{ site.starttime }}',
    showMeridian: false
});

$('#expirationtime').timepicker({
    minuteStep: 1,
    defaultTime: '{{ site.endtime }}',
    showMeridian: false
});

var $warning = $('#type'), $magnitude = $('#magnitude'), $threat = $('#threat'), $magnitudeaddon = $('#magnitudeaddon'), $submitter = $('#submitter');

// Severe storms enable further selection of warning type and magnitude.
$warning.change(function () {
    if ($warning.val() == 'Severe Storm') {
        $magnitude.removeAttr('disabled');
        $threat.removeAttr('disabled');
        $magnitude.attr('required','required');
        $threat.attr('required','required');
    } else {
        $magnitude.attr('disabled','disabled').val('');
        $threat.attr('disabled','disabled').val('');
        $magnitude.removeAttr('required');
        $threat.removeAttr('required');
        $magnitudeaddon.html('');
    }
}).trigger('change');


// For severe storm magnitude, units shown depend on warning type.
$threat.change(function () {
    if ($threat.val() == 'Severe Wind') {
        $magnitudeaddon.html('kts');
    } else if ($threat.val() == 'Severe Hail') {
        $magnitudeaddon.html('inches');
    } else {
        $magnitudeaddon.html('');
    }
}).trigger('change');


// Reset function that clears all fields and map.
function ResetData() {
    document.getElementById("stormwarning").reset();

    $warning.trigger('change');
    $threat.trigger('change');

    ResetMap();
};


// Posts the storm warning to the php script to add to database.
$('#stormwarning').submit(function(e) {
    e.preventDefault();
    var $btn = $('#submitter').button('loading')
    var $form = $( this );
    var disabled = $form.find(':input:disabled').removeAttr('disabled');
    forecasterNumber = document.getElementById('forecaster').value;
    radarTime = document.getElementById('radartime').value;
    expTime = document.getElementById('expirationtime').value;

    var url = "{{ '/warn/issue.php' | prepend: site.baseurl }}";
    var datain = $form.serialize() + "&polygon=" + JSON.stringify(drawnWarning.toGeoJSON());
    var posting = $.post( url, datain );
    posting.done(function( data ) {
        if (data.status == 'success'){
            responsehtml = '<div class="alert alert-dismissable alert-success">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<h4><i class="glyphicon glyphicon-ok"></i><strong> ' + data.warning +
                ' Warning issued!</strong></h4>' + 'Issued with Forecaster ID ' + data.forecaster +
                ' at ' + data.radartime + '. Affected cities have been notified.</div>';
            document.getElementById('returnvalue').innerHTML = responsehtml;
            ResetData();
            document.getElementById('forecaster').value = forecasterNumber;
            document.getElementById('radartime').value = radarTime;
            document.getElementById('radartime').setAttribute('disabled','disabled');
            document.getElementById('expirationtime').value = expTime;
        } else if(data.status == 'error'){
            responsehtml = '<div class="alert alert-dismissable alert-danger">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<h4><strong>ERROR!</strong></h4> Error issuing storm warning due to database.' +
                ' CALL TECH SUPPORT (AKA your TA) NOW and don`t close this message!<br><br>' + data.msg + '</div>';
            document.getElementById('returnvalue').innerHTML = responsehtml;
            $warning.trigger('change');
            $threat.trigger('change');
        }
    });
    $btn.button('reset');
});


// Map objects and functions

drawnWarning = new L.FeatureGroup();

// Options to only draw (a polygon)
var drawOptions = {
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


// Options to only edit
var editOptions = {
    draw: false,
    edit: {
        featureGroup: drawnWarning
    }
};


var polygonid = JSON.stringify(drawnWarning.toGeoJSON());
map.addLayer(drawnWarning);

var drawControl = new L.Control.Draw(drawOptions);
var editControl = new L.Control.Draw(editOptions);
map.addControl(drawControl);


// When a polygon is drawn, only allow the user to edit or delete.
//   Also enable warning submission.
map.on('draw:created', function (e) {
    layer = e.layer;
    layer.addTo(drawnWarning);
    drawControl.removeFrom(map);
    editControl.addTo(map)
    polygonid = JSON.stringify(drawnWarning.toGeoJSON());
    $submitter.removeAttr('disabled');
});

// While a polygon is being edited, disable submission.
map.on('draw:edited', function (e) {
    polygonid = JSON.stringify(drawnWarning.toGeoJSON());
    $submitter.attr('disabled','disabled');
});

// When a polygon is deleted, disable submission and enable drawing.
map.on('draw:deleted', function (e) {
    editControl.removeFrom(map);
    drawControl.addTo(map);
    polygonid = JSON.stringify(drawnWarning.toGeoJSON());
    $submitter.attr('disabled','disabled');
});


// Map reset that nukes all user drawn items.
function ResetMap() {
    map.removeLayer(drawnWarning);
    drawnWarning = new L.FeatureGroup();
    polygonid = JSON.stringify(drawnWarning.toGeoJSON());
    map.addLayer(drawnWarning);
    editControl.removeFrom(map);
    // Options to only draw (a polygon)
    var drawOptions = {
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
    // Options to only edit
    var editOptions = {
        draw: false,
        edit: {
            featureGroup: drawnWarning
        }
    };
    drawControl = new L.Control.Draw(drawOptions);
    editControl = new L.Control.Draw(editOptions);
    map.addControl(drawControl);
};



