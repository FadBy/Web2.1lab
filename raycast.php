<?php

header("Content-Type: application/json");

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
        $table = array();
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
        $table[count($table)] = new Result($x, $y, $r, $hitResult, $currentTime, $executionTime);
        for ($i = 0; $i < count($table); $i++) {
            echo json_encode(["x" => $x, "y" => $y, "r" => $r, "hitResult" => $hitResult, "currentTime" => $currentTime, "executionTime" => $executionTime]);
        }
    }
?>