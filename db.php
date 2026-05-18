<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "training_platform";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen");
}
?>
