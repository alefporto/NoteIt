import io from './server.js';
import { getAllNotes, findNote, createNote, updateNote, deleteNote } from './dbNotes.js';

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

        if(note) atualizarTextoCallback(note.text); // Se existir a anotação no banco de dados, devolve pro front o texto dela
    })

    // Processa o evento para adicionar uma nova anotação
    socket.on('add_note', async (nomeNote) => {
        const noteExiste = await findNote(nomeNote);
        
        // Se a anotação já existe, emite um evento para tratar isso
        if(noteExiste) socket.emit('note_existente', nomeNote);
        
        // Se a anotação ainda não existe, cria ela e após isso atualiza a interface de todos os clientes
        if(!noteExiste){
            const row = await createNote(nomeNote);
            if(row.acknowledged) io.emit('add_note_interface', nomeNote);
        }
    })

    // Processa o evento de edição de texto recebido do cliente
    socket.on('texto_alterado', async (nomeNote, textoNote) => {
        const updateStatus = await updateNote(nomeNote, textoNote);

        // Se for feita alguma atualização no banco, emite evento de atualização da interface para os clientes que estiverem na mesma anotação
        if(updateStatus.modifiedCount)
            socket.to(nomeNote).emit('atualizar_texto', textoNote);
    })

    // Processa o evento de exclusão de uma anotação
    socket.on('excluir_note', async (nomeNote) => {
        const row = await deleteNote(nomeNote);
        
        // Se a anotação foi excluída, emite evento de atualização da interface de todos os clientes
        if(row.acknowledged)
            io.emit('note_excluida', nomeNote);
    })
})
