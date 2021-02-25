<?php
    class EstablishPDO extends PDO
    {
        public function __construct($file = "../settings.ini")
        {
            if (!$settings = parse_ini_file($file, TRUE)) throw new exception("Unable to open " . $file . ".");
            
            $dns = $settings["database"]["driver"] .
                   ":host=" .
		   $settings["database"]["host"] .
                   ((!empty($settings["database"]["port"])) ? (";port=" . $settings["database"]["port"]) : "") .
                   ";dbname=" . $settings["database"]["dbname"];
            global $tablename;
            $tablename = $settings["database"]["table"];
            parent::__construct($dns, $settings["database"]["username"], $settings["database"]["password"]);
        }
    }
    
    try {
        $db = new EstablishPDO;
    
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
            try {
                $q = $db->prepare(
                    "INSERT INTO " .
                    $tablename . " (" .
                    " forecaster," .
                    " warningtype," .
                    " threat," .
                    " magnitude," .
                    " source," .
                    " radartime," .
                    " expirationtime," .
                    " direction," .
                    " speed," .
                    " details," .
                    " polygon)" .
                    " VALUES ".
                    "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                );
                $q->execute(
                    array(
                        $_POST["forecaster"],
                        $_POST["type"],
                        $_POST["threat"],
                        $_POST["magnitude"],
                        $_POST["source"],
                        $_POST["radartime"],
                        $_POST["expirationtime"],
                        $_POST["direction"],
                        $_POST["speed"],
                        $_POST["details"],
                        $_POST["polygon"]
                    )
                );
                $response_array["status"] = "success";
                $response_array["forecaster"] = $_POST["forecaster"];
                $response_array["warning"] = $_POST["type"];
                $response_array["radartime"] = $_POST["radartime"];
            } catch (PDOException $e) {
                $response_array["status"] = "error";
                $response_array["msg"] = "There was an issue writing to the database.";
		file_put_contents("php://stderr", $e->getMessage());
            }
        };
    
    } catch (PDOException $e) {
        $response_array["status"] = "error";
        $response_array["msg"] = "There was an issue accessing the database.";
	file_put_contents("php://stderr", $e->getMessage());
    }
    
    header("Content-type: application/json");
    echo json_encode($response_array);
?>
