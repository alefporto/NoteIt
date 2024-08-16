import { inserirLinkNote } from './index.js';

const socket = io();

// Emite um evento para o servidor para indicar que um cliente entrou em index.html
function emitirGetAllNotes() {
    // Passa uma função callback como parâmetro que faz a lógica de inserir a anotação no HTML
    socket.emit('get_all_notes', (notes) => {
        notes.forEach(note => {
            inserirLinkNote(note.tittle);
        });
    });
}

export { emitirGetAllNotes };
