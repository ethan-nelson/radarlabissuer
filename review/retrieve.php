<?php
class EstablishPDO extends PDO
{
    public function __construct($file = '../settings.ini')
    {
        if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open ' . $file . '.');
        
        $dns = $settings['database']['driver'] .
        ':host=' . $settings['database']['host'] .
        ((!empty($settings['database']['port'])) ? (';port=' . $settings['database']['port']) : '') .
        ';dbname=' . $settings['database']['dbname'];
        global $tablename;
		$tablename = $settings['database']['table'];
        parent::__construct($dns, $settings['database']['username'], $settings['database']['password']);
    }
}

$db = new EstablishPDO;

if ($_SERVER['REQUEST_METHOD'] == "POST") {

	print "<h3>Forecaster ID: " . $_POST["forecasternumber"] . "</h3>";
	print "<div class='panel-group' id='accordian' role='tablist'>";
	$sql = "SELECT * FROM " . $tablename . " WHERE forecaster = " . $_POST["forecasternumber"] . " ORDER BY timestamp DESC";
	$i = 0;
	foreach ($db->query($sql) as $row) {
		print "<div class='panel panel-default'>";
    	print "<div class='panel-heading' role='tab' id='heading". $i . "'>";
		print "<h4 class='panel-title'>";
		print "<a data-toggle='collapse' data-parent='#accordian' href='#" . $i . "'>";

		print $row['warningtype'] . " Warning at " . $row['radartime'];

		print "</a>";
		print "</h4>";
		print "</div>";

		print "<div class='panel-collapse collapse' role='tabpanel' id='" . $i . "'>";
		print "<div class='panel-body'>";
		print "<div class='col-lg-6'>";

		print "<b>Issued at:</b> " . $row['radartime'];
		print "<br /><b>Expires at:</b> " . $row['expirationtime'];
		if (!empty($row['threat'])) {
			print "<br /><b>Threat:</b> " . $row['threat'];
			if ($row['threat'] == 'Severe Hail') {
				print "<br /><b>Magnitude:</b> " . $row['magnitude'] . " in";
			} else if ($row['threat'] == 'Severe Wind') {
				print "<br /><b>Magnitude:</b> " . $row['magnitude'] . " kts";
			};
		};
		print "<br /><b>Source:</b> " . $row['source'];
		if (!empty($row['direction'])) {
			print "<br /><b>Movement:</b> " .$row['direction'] . " @ " . $row['speed'] . " kts ";
		};
		print "<br /><b>Details:</b> " .$row['details'];

		print "</div>";
		print "<div class='col-lg-6'>";
		print "<div id='map" . $i . "' style='height: 350px; width: 450px;' class='mapdisplay'></div>";
		print "<div id='coord" . $i . "' style='display:none'>" . $row['polygon'] . "</div>";
		print "</div>";

		print "</div>";
		print "</div>";
		print "</div>";
		$i++;
	}
	print "</div>";

};

?>
