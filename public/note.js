import { selecionarNote, emitirTextoAlterado } from './socket-front-note.js';

// Seleciona os elementos HTML que serão manipulados
const tituloHTML = document.getElementById('titulo-pagina');
const tituloNote = document.getElementById('titulo-note');
const textoNote  = document.getElementById('texto-note');

// Pega o nome da anotação pelos query params
const params = new URLSearchParams(window.location.search);
const nomeNote = params.get("nome");

// Dinamiza o nome da anotação no HTML
tituloHTML.innerHTML = nomeNote || "Anotação sem título";
tituloNote.innerHTML = nomeNote || "Anotação sem título";

// Atualiza a anotação com o seu respectivo texto ao abrir
selecionarNote(nomeNote);

// Envia um evento para o servidor informando que o texto dessa anotação foi alterado
textoNote.addEventListener('keyup', () => {
    emitirTextoAlterado(nomeNote, textoNote.value);
})

// Atualiza o campo de texto com o texto passado via parâmetro
function atualizaCampoTexto(texto) {
    textoNote.value = texto
}

export { atualizaCampoTexto };
