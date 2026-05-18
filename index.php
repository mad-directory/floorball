<?php
session_start();
include 'db.php';
?>

<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Trainingsplattform</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<?php if(!isset($_SESSION['user_id'])): ?>

<div class="login-box">
  <h1>Login</h1>

  <form action="login.php" method="POST">
    <input type="text" name="username" placeholder="Benutzername">
    <input type="password" name="password" placeholder="Passwort">
    <button type="submit">Anmelden</button>
  </form>
</div>

<?php else: ?>

<div class="topbar">
  <h1>Willkommen <?php echo $_SESSION['username']; ?></h1>
  <a href="logout.php">Logout</a>
</div>

<div class="layout">

  <div class="sidebar">
    <h2>Meine Listen</h2>

    <?php
    $user_id = $_SESSION['user_id'];

    $lists = $conn->query("SELECT * FROM lists WHERE user_id=$user_id");

    while($list = $lists->fetch_assoc()) {
      echo "<div class='list'>";
      echo "<h3>" . $list['list_name'] . "</h3>";

      $list_id = $list['id'];

      $saved = $conn->query("SELECT * FROM saved_exercises WHERE list_id=$list_id");

      while($exercise = $saved->fetch_assoc()) {
        echo "<p>• " . $exercise['exercise_name'] . "</p>";
      }

      echo "</div>";
    }
    ?>
  </div>

  <div class="content">
</html>
