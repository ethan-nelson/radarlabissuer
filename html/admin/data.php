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

$sql = "SELECT polygon FROM " . $tablename . " ORDER BY timestamp DESC";
$result = $db->query($sql);
$i = 0;

print '[';
foreach ($result as $row) {
     print $row['polygon'];
     $i++;
     if ($i < $result->rowCount()) {
         print ",";
     }
}
print ']';

?>
