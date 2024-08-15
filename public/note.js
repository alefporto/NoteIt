// Para manipular os elementos HTML
const tagTituloHTML = document.getElementById('titulo-pagina');
const tagTituloNote = document.getElementById('titulo-note');

// Pega o nome da anotação pelos query params
const params = new URLSearchParams(window.location.search);
const nomeNote = params.get("nome");

// Dinamizando o nome da anotação no HTML
tagTituloHTML.innerHTML = nomeNote || "Anotação sem título";
tagTituloNote.innerHTML = nomeNote || "Anotação sem título";
