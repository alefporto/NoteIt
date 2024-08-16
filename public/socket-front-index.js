import { inserirLinkNote } from './index.js';

const socket = io();

// Atualiza a interface quando uma anotação é criada
socket.on('add_note_interface', (nomeNote) => {
    inserirLinkNote(nomeNote);
})

// Trata o evento de quando alguém tenta criar uma anotação já existente
socket.on('note_existente', (nomeNote) => {
    alert(`A anotação ${nomeNote} já existe!`);
})

// Emite um evento para o servidor para indicar que um cliente entrou em index.html
function emitirGetAllNotes() {
    // Passa uma função callback como parâmetro que faz a lógica de inserir a anotação no HTML
    socket.emit('get_all_notes', (notes) => {
        notes.forEach(note => {
            inserirLinkNote(note.tittle);
        });
    });
}

// Emite um evento para o servidor tratar a adição de uma anotação ao banco de dados
function emitirAddNote(nomeNote) {
    socket.emit('add_note', nomeNote);
}

export {
    emitirGetAllNotes,
    emitirAddNote
};
