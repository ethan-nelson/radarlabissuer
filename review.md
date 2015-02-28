---
layout: page
title: Review Warnings
slug: /review
---
<script>
var mapper = [];
function LoadMap(divname) {

}

function PostData() {
	var x = document.forms["warning"]["forecasterNumber"].value;
	if (x == null || x == "") {
		alerthtml = '<div class="alert alert-warning" role="alert"><strong>Oh snap!</strong> ' +
					'Please enter your forecaster number. See your TA if you do not know it.</div>';
		document.getElementById('alertarea').innerHTML = alerthtml
		return false;
	}

    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        throw new Error("Ajax is not supported by this browser");
    }


	var forecasternumber = document.getElementById("forecasterNumber").value;

    xhr.open('POST', '/review/retrieve.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("forecasternumber=" + forecasternumber);

  	xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) {
                document.getElementById('everything').innerHTML = xhr.responseText;
				var divname;

				for ($x = 0; $x < document.getElementsByClassName("mapdisplay").length; $x++) {
					divname = 'map' + $x;
					mapper[$x] = L.map(divname).setView([0.0,0.0],10);
					divname = 'coord' + $x;
					jsoncoll = JSON.parse((document.getElementById(divname).innerHTML).replace(/\\/g, ''))
					L.geoJson(jsoncoll).addTo(mapper[$x]);
				}

				$('#accordian').on('shown.bs.collapse', function () {
					for ($x = 0; $x < document.getElementsByClassName("mapdisplay").length; $x++) {
						mapper[$x]._onResize();
					}
				})
            } else {
					responsehtml = '<div class="alert alert-dismissable alert-danger">' +
                	'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
        			'<h4><strong>ERROR!</strong></h4> Error retrieving. ' +
					' CALL TECH SUPPORT (AKA your TA) NOW!</div>';
                	document.getElementById('everything').innerHTML = responsehtml
			}
        }
    }
}

$.each($('.collapse'),function(){
      $(this).click(function() {
            if($(this).hasClass("collapsed.in")){
				for ($x = 0; $x < document.getElementsByClassName("mapdisplay").length; $x++) {
					mapper[$x]._onResize();
				}
            }
      });
});


</script>

<div id="everything">
<div id="alertarea"></div>
<form name="warning" class="form-inline" id="reviewwarnings" onSubmit="PostData(); return false;">
	<fieldset>

      <div class="form-group">
        <label class="control-label" for="forecasterNumber">Forecaster number:</label>
        <input class="form-control" id="forecasterNumber" type="text" name="forecasterNumber">
      </div>

		<input class="btn btn-default" value="Review Warnings" type="submit">
	</fieldset>
</form>


</div>

