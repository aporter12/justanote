<?php 
$userId = $_GET['uId'];
$activeNoteTitle = $_GET['anTi'];
$activeNoteText = $_GET['anTx'];

$conection = new mysqli('localhost','root','','just_a_note');
$newNote = "INSERT INTO notes (userId, title, note)
				VALUES ('$userId' ,'$activeNoteTitle', '$activeNoteText')";

if ($conection->query($newNote) === TRUE) {
    echo "1";
}
else{
	echo "0";
}

 ?>