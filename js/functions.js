var baseURL = "http://187.134.251.100/justanote/php/"

function loadNotes(){
	if (!localStorage.getItem('userId')) {
		window.location.assign('login.html');
	}

	loggedUserId = localStorage.getItem('userId');

	notesAjax = new XMLHttpRequest();
	notesAjax.open('GET',baseURL + 'notes.php?uId='+loggedUserId);
	notesAjax.send();
	notesAjax.onreadystatechange = function(){
		if (notesAjax.readyState == 4 && notesAjax.status == 200){
			notes = JSON.parse(notesAjax.responseText);

			for(i=0; i<notes.length; i++){
				div = 	"<div class='nota'>"+
							"<span  onclick='goToNote("+notes[i].noteId+")'>"+notes[i].title+"</span>"+
							"<i class='fa fa-trash' aria-hidden='true' onclick='eraseNote("+notes[i].noteId+")'></i>"+
						"</div>";

				document.getElementById('notas').innerHTML += div;
			}
		}
	}
}
function login(){
	user = document.getElementById('user').value;
	pass = document.getElementById('password').value;
	if(user != "" && pass != "") {
		//LOGIN
		logAjax = new XMLHttpRequest();
		logAjax.open('GET',baseURL + 'login.php?u='+user+'&p='+pass);
		logAjax.send();
		logAjax.onreadystatechange = function(){
			if (logAjax.readyState==4 && logAjax.status == 200) {
				if (logAjax.responseText!="0") {
					localStorage.setItem('userId', logAjax.responseText);
					window.location.assign('index.html');
				}else{
					document.querySelector('.error').style.opacity="1"
					document.querySelector('.error').innerHTML = "Incorrect user or password.";
					setTimeout(function(){
						document.querySelector('.error').style.opacity="0";
					},5000);
				}
			}
		}	
	}else{
		document.querySelector('.error').style.opacity="1"
		document.querySelector('.error').innerHTML = "Please type username and password.";
		setTimeout(function(){
			document.querySelector('.error').style.opacity="0";
		},5000);
	}
}
function signup(){
	user = document.getElementById('user').value;
	pass = document.getElementById('password').value;
	pass2 = document.getElementById('password2').value;
	
	if(user != "" && pass != "" && pass2 != "") {
		if (pass === pass2) {
			signupAjax = new XMLHttpRequest();
			signupAjax.open('GET',baseURL + 'signup.php?u='+user+'&p='+pass);
			signupAjax.send();
			signupAjax.onreadystatechange = function(){
				if (signupAjax.readyState==4 && signupAjax.status == 200) {
					response = signupAjax.responseText;
					console.log(response);
					if (signupAjax.responseText!="0") {
						console.log('usuario registrado');
						document.querySelector('.error').style.opacity="1";
						document.querySelector('.error').style.color="var(--blue-color)";
						document.querySelector('.error').innerHTML = "Succesfully registered user.";
						document.getElementById('user').value = "";
						document.getElementById('password').value = "";
						document.getElementById('password2').value = "";
					}else{
						document.querySelector('.error').style.opacity="1";
						document.querySelector('.error').style.color="var(--red-color)";
						document.querySelector('.error').innerHTML = "Couldn\'t sign up. Try again later";
						setTimeout(function(){
							document.querySelector('.error').style.opacity="0";
						},5000);
					}
				}
			}
		}else{
			document.querySelector('.error').style.color="var(--red-color)";
			document.querySelector('.error').style.opacity="1"
			document.querySelector('.error').innerHTML = "Passwords do not coincide.";
			setTimeout(function(){
				document.querySelector('.error').style.opacity="0";
			},5000);
		}
	}else{
		document.querySelector('.error').style.color="var(--red-color)";
		document.querySelector('.error').style.opacity="1"
		document.querySelector('.error').innerHTML = "Please type all values in the form.";
		setTimeout(function(){
			document.querySelector('.error').style.opacity="0";
		},5000);
	}
}
function logout(){
	localStorage.removeItem('userId');
	window.location.assign('login.html');
}
function openNote(){
	loggedUserId = localStorage.getItem('userId');
	if(localStorage.getItem('activeNoteId')){
		activeNoteId = localStorage.getItem('activeNoteId');
		activeNoteTitle = "";
		activeNoteText = "";

		notesAjax = new XMLHttpRequest();
		notesAjax.open('GET',baseURL + 'notes.php?uId='+loggedUserId);
		notesAjax.send();
		notesAjax.onreadystatechange = function(){
			if (notesAjax.readyState == 4 && notesAjax.status == 200){
				notes = JSON.parse(notesAjax.responseText);
				
				for(i=0; i<notes.length; i++){
					if(notes[i].noteId == activeNoteId){
						activeNoteTitle = notes[i].title;
						activeNoteText = notes[i].noteText;
					}
				}
				document.getElementById('note-title').value = activeNoteTitle;
				document.getElementById('note-text').value = activeNoteText;
			}
		}
	}
}

function back(){
	localStorage.removeItem('activeNoteId');
	window.location.assign('index.html');
}
function saveNote(){
	loggedUserId = localStorage.getItem('userId');
	activeNoteTitle = document.getElementById('note-title').value;
	activeNoteText = document.getElementById('note-text').value;

// If it's a note already stored in the database
	if(localStorage.getItem('activeNoteId')){
		if(activeNoteTitle.length <= 40 && activeNoteText.length <= 10000){
			activeNoteId = localStorage.getItem('activeNoteId');
			editNoteAjax = new XMLHttpRequest();
			editNoteAjax.open('GET',baseURL + 'editNote.php?anId='+activeNoteId+
								'&anTi='+activeNoteTitle+'&anTx='+activeNoteText);
			editNoteAjax.send();
			editNoteAjax.onreadystatechange = function(){
				if (editNoteAjax.readyState == 4 && editNoteAjax.status == 200){
					if(editNoteAjax.responseText == "1"){
						document.getElementById('success-save').style.opacity = '1';
						setTimeout(function(){
							document.getElementById('success-save').style.opacity = '0';
						},2500);
					}
					else{
						document.getElementById('success-save').style.opacity = '1';
						document.getElementById('success-save').style.color = 'var(--red-color)';
						document.getElementById('success-save').innerHTML = "Sorry... Couldn\'t save to the database. Please try again later."
						setTimeout(function(){
							document.getElementById('success-save').style.opacity = '0';
						document.getElementById('success-save').style.color = 'var(--blue-color)';
						},4000);
					}
				}
			}
		}else{
			if (activeNoteTitle.length > 40) {
				document.getElementById('note-title').style.boxShadow = '0 0 1px 1px var(--red-color)';
				document.getElementById('success-save').innerHTML = "The title has more than 40 characters.";
				document.getElementById('success-save').style.opacity = '1';
				setTimeout(function(){
					document.getElementById('success-save').style.opacity = '0';
				},2500);
			}
			if (activeNoteText.length > 10000) {
				document.getElementById('note-text').style.boxShadow = '0 0 1px 1px var(--red-color)';
				document.getElementById('success-save').innerHTML = "The note has more than 10,000 characters.";
				document.getElementById('success-save').style.opacity = '1';
				setTimeout(function(){
					document.getElementById('success-save').style.opacity = '0';
				},2500);
			}
		}
	}

// If it's a new note
	else{
		if(activeNoteTitle.length <= 40 && activeNoteText.length <= 10000){			
			newNoteAjax = new XMLHttpRequest();
			newNoteAjax.open('GET',baseURL + 'newNote.php?uId='+loggedUserId+'&anTi='+
								activeNoteTitle+'&anTx='+activeNoteText);
			newNoteAjax.send();
			newNoteAjax.onreadystatechange = function(){
				if (newNoteAjax.readyState == 4 && newNoteAjax.status == 200){

					console.log(newNoteAjax.responseText);

					if(newNoteAjax.responseText == "1"){
						document.getElementById('success-save').style.opacity = '1';
						setTimeout(function(){
							document.getElementById('success-save').style.opacity = '0';
						},2500);
					}
				}
			}
		}else{
			if (activeNoteTitle.length > 40) {
				document.getElementById('note-title').style.boxShadow = '0 0 1px 1px var(--red-color)';
				document.getElementById('success-save').innerHTML = "The title has more than 40 characters.";
				document.getElementById('success-save').style.opacity = '1';
				setTimeout(function(){
					document.getElementById('success-save').style.opacity = '0';
				},2500);
			}
			if (activeNoteText.length > 10000) {
				document.getElementById('note-text').style.boxShadow = '0 0 1px 1px var(--red-color)';
				document.getElementById('success-save').innerHTML = "The note has more than 10,000 characters.";
				document.getElementById('success-save').style.opacity = '1';
				setTimeout(function(){
					document.getElementById('success-save').style.opacity = '0';
				},2500);
			}
		}

	}
}
function newNote(){
	window.location.assign('note.html');
}

function eraseNote(noteId){
	document.getElementById('confirm-delete').style.display = 'block';
	localStorage.setItem('noteIdToDrop', noteId);
}
function confirmDelete(){
	noteIdToDelete = localStorage.getItem('noteIdToDrop');
	deleteNoteAjax = new XMLHttpRequest();
	deleteNoteAjax.open('GET',baseURL + 'deleteNote.php?nId='+noteIdToDelete);
	deleteNoteAjax.send();
	deleteNoteAjax.onreadystatechange = function(){
		if (deleteNoteAjax.readyState == 4 && deleteNoteAjax.status == 200){
			if(deleteNoteAjax.responseText == "1"){
				document.getElementById('confirm-delete').style.display = 'none';
				location.reload();
			}
		}
	}
}
function cancelDelete(){
	document.getElementById('confirm-delete').style.display = 'none';
	localStorage.removeItem('noteIdToDrop');
}