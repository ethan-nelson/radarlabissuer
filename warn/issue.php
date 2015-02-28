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
        
        parent::__construct($dns, $settings['database']['username'], $settings['database']['password']);
    }
}

$db = new EstablishPDO;

if ($_SERVER['REQUEST_METHOD'] == "POST") {

   $q = $db->prepare("INSERT INTO save (forecaster, textbox, label, threat, magnitude, source, expiry_time, radar_time, direction, speed, polygon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
   $q->execute(array($_POST["forecaster"], $_POST["info"], $_POST["label"], $_POST["threat"], $_POST["magnitude"], $_POST["source"], $_POST["expirationtime"], $_POST["radartime"], $_POST["direction"], $_POST["speed"], $_POST["polygon"]));
   echo $_POST["label"];
};

?>
