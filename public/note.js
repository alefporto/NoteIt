import { emitirTextoAlterado } from './socket-front-note.js';

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
    emitirTextoAlterado(tagTextoNote.value);
})

// Atualiza o campo de texto com o texto passado via parâmetro
function atualizaCampoTexto(texto){
    tagTextoNote.value = texto
}

export { atualizaCampoTexto };
