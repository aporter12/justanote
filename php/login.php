<?php 
$user = $_GET['u'];
$pass = $_GET['p'];

$conection = new mysqli('localhost','root','','just_a_note');
$checkLogin = "SELECT * FROM users WHERE
				username = '$user' AND password = '$pass'";
$results = $conection->query($checkLogin);

if (mysqli_num_rows($results)>0) {
	$r = $results->fetch_object();
	echo $r->userId;
}else{
	echo "0";
}

?>