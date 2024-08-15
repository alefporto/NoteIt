const socket = io();

// Seleciona os elementos HTML que serão manipulados
const tagTituloHTML = document.getElementById('titulo-pagina');
const tagTituloNote = document.getElementById('titulo-note');
const tagTextoNote  = document.getElementById('texto-note');

// Pega o nome da anotação pelos query params
const params = new URLSearchParams(window.location.search);
const nomeNote = params.get("nome");

// Dinamiza o nome da anotação no HTML
tagTituloHTML.innerHTML = nomeNote || "Anotação sem título";
tagTituloNote.innerHTML = nomeNote || "Anotação sem título";

// Envia um evento para o servidor informando que o texto foi alterado
tagTextoNote.addEventListener('keyup', () => {
    socket.emit('texto_alterado', tagTextoNote.value);
})

// Atualiza o conteúdo do campo de texto com o novo texto recebido do servidor
socket.on('atualizar_texto', (texto) => {
    tagTextoNote.value = texto;
})
