<?php
include 'db.php';

$list_id = $_POST['list_id'];
$exercise = $_POST['exercise'];

$sql = "INSERT INTO saved_exercises (list_id, exercise_name) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $list_id, $exercise);
$stmt->execute();
?>
