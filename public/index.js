import { emitirGetAllNotes, emitirAddNote } from "./socket-front-index.js";

// Seleciona os elementos HTML que serão manipulados
const containerNotes = document.getElementById('lista-notes');
const formAddNote    = document.getElementById('form-add-note');
const inputNote      = document.getElementById('input-note');

// Obtem anotações do banco de dados e adiciona no HTML dinamicamente
emitirGetAllNotes();

// Envia um evento para o servidor informando que uma anotação vai ser criada
formAddNote.addEventListener('submit', (event) => {
    event.preventDefault();
    emitirAddNote(inputNote.value);
    inputNote.value = "";
})

// Insere dinamicamente no HTML uma anotação com o nome passado como parâmetro
function inserirLinkNote(nomeNote) {
    containerNotes.innerHTML += `
        <a href="note.html?nome=${nomeNote}" class="list-group-item list-group-item-action">${nomeNote}</a>
    `
}

export { inserirLinkNote };
