<?php
ini_set('display_errors', true);
session_start();
if (!isset($_SESSION['table'])) {
    $_SESSION['table'] = array();
}

header("Content-Type: application/json");

echo json_encode($_SESSION['table']);
?>