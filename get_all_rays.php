<?php
if (!isset($_SESSION['table'])) {
    $_SESSION['table'] = array();
}

header("Content-Type: application/json");

session_start();

echo json_encode($_SESSION['table']);
?>