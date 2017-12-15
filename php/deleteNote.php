<?php 
$noteId = $_GET['nId'];

$conection = new mysqli('localhost','root','','just_a_note');
$deleteNote = "DELETE FROM notes WHERE noteId = '$noteId'";

if ($conection->query($deleteNote) === TRUE) {
    echo "1";
}
else{
	echo "0";
}

 ?>