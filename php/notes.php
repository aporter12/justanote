<?php
$userId = $_GET['uId'];

	$conection = new mysqli('localhost','root','','just_a_note');
	$notes = "SELECT * FROM notes 
					WHERE userId = '$userId'";

	$response = $conection->query($notes);
	$noteArray = array();
	while ($note = $response->fetch_object()) {
		array_push($noteArray, array(
			"noteId"=>$note->noteId,
			"title"=>$note->title,
			"noteText"=>$note->note,
		));
	}

	echo json_encode($noteArray);
?>