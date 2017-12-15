<?php 
$activeNoteId = $_GET['anId'];
$activeNoteTitle = $_GET['anTi'];
$activeNoteText = $_GET['anTx'];

$conection = new mysqli('localhost','root','','just_a_note');
$editNote = "UPDATE notes SET title = '$activeNoteTitle', note = '$activeNoteText'
				WHERE noteId = '$activeNoteId'";

// $conection->query($editNote);
if ($conection->query($editNote) === TRUE) {
    echo "1";
}
else{
	echo "0";
}



 ?>