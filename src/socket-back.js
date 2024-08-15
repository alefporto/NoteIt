import io from './server.js';

io.on("connection", (socket) => {
    console.log( `Um cliente se conectou! ID: ${socket.id}` );

    // Processa o evento de edição de texto recebido do cliente
    socket.on('texto_alterado', (textoNote) => {
        // Broadcast o evento de atualização da interface para todos os clientes
        socket.broadcast.emit('atualizar_texto', textoNote);
    })
})
