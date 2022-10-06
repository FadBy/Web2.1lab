<?php
if (!isset($_SESSION['table'])) {
    $_SESSION['table'] = array();
}
header("Content-Type: application/json");
// throw new Exception(strval(session_status()) . "adfasdfasdfsadf");
session_start();    


function cast($x, $y, $r) {
    if($x > 0) {
        if ($x <= $r && $x >= 0 && $y >= -$r / 2 && $y <= 0) {
            return True;
        }
    }
    else if ($y < 0) {
        if ($x * $x + $y * $y <= $r * $r / 4) {
            return True;
        }
    }
    else {
        if ($y <= $x / 2 + $r / 2) {
            return True;
        }
    }
    return False;
}

class Result {
    var $x;
    var $y;
    var $r;
    var $hitResult;
    var $currentTime;
    var $executionTime;

    function __construct($x, $y, $r, $hitResult, $currentTime, $executionTime) {
        $this->x = $x;
        $this->y = $y;
        $this->r = $r;
        $this->hitResult = $hitResult;
        $this->currentTime = $currentTime;
        $this->executionTime = $executionTime;
    }
}
?>
<?php
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $time_start = microtime(true); 
        date_default_timezone_set("Etc/GMT-3");
        $table = $_SESSION['table'];
        $x = $_POST["x"];
        $y = $_POST["y"];
        $r = $_POST["r"];
        $hitResultBool = cast($x, $y, $r);
        if ($hitResultBool) {
            $hitResult = "hit";
        } else {
            $hitResult = "miss";
        }
        $currentTime = date("h:i:s");
        $executionTime = round(microtime(true) - $time_start, 5);
        $to_add = ["x" => $x, "y" => $y, "r" => $r, "hitResult" => $hitResult, "currentTime" => $currentTime, "executionTime" => $executionTime];
        array_push($table, $to_add);
        $_SESSION['table'] = $table;
        echo json_encode($to_add);
    }
?>