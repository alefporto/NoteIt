import { emitirGetAllNotes } from "./socket-front-index.js";

// Seleciona os elementos HTML que serão manipulados
const containerNotes = document.getElementById('lista-notes');

// Obtem anotações do banco de dados e adiciona no HTML dinamicamente
emitirGetAllNotes();

// Insere dinamicamente no HTML uma anotação com o nome passado como parâmetro
function inserirLinkNote(nomeNote) {
    containerNotes.innerHTML += `
        <a href="note.html?nome=${nomeNote}" class="list-group-item list-group-item-action">${nomeNote}</a>
    `
}

export { inserirLinkNote };