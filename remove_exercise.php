<?php
include 'db.php';

$id = $_POST['id'];

$sql = "DELETE FROM saved_exercises WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
?>
