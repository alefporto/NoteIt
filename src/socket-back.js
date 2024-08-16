import io from './server.js';
import { getAllNotes, findNote } from './dbNotes.js';

io.on("connection", (socket) => {
    console.log(`Um cliente se conectou! ID: ${socket.id}`);

    // Processa o evento de obter todas as anotações quando se entra no arquivo index.html
    socket.on('get_all_notes', async (devolverNotesCallback) => {
        const notes = await getAllNotes();
        devolverNotesCallback(notes);
    })

    // Processa o evento para quando se entra em uma anotação
    socket.on('selecionar_note', async (nomeNote, atualizarTextoCallback) => {
        socket.join(nomeNote); // Coloca o cliente em uma sala WebSocket referente a anotação

        const note = await findNote(nomeNote);

        if (note) atualizarTextoCallback(note.text); // Se existir a anotação no banco de dados, devolve pro front o texto dela
    })

    // Processa o evento de edição de texto recebido do cliente
    socket.on('texto_alterado', (nomeNote, textoNote) => {
        // Emite evento de atualização da interface para os clientes que estiverem na mesma anotação
        socket.to(nomeNote).emit('atualizar_texto', textoNote);
    })
})
