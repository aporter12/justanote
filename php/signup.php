<?php 
$user = $_GET['u'];
$pass = $_GET['p'];

$conection = new mysqli('localhost','root','','just_a_note');
$signup = "INSERT INTO users (username, password)
				VALUES ('$user', '$pass')";
$conection->query($signup);

$checkSignup = "SELECT * FROM users WHERE
				username = '$user' AND password = '$pass'";
$results = $conection->query($checkSignup);

if (mysqli_num_rows($results) == 0) {
	echo "0";
}else{
	echo "1";
}

?>