import { atualizaCampoTexto } from "./note.js";

const socket = io();

// Emite um evento para o servidor informando que o texto foi alterado
function emitirTextoAlterado(textoNote){
    socket.emit('texto_alterado', textoNote);
}

// Atualiza o conteúdo do campo de texto com o novo texto recebido do servidor
socket.on('atualizar_texto', (texto) => {
    atualizaCampoTexto(texto);
})

export { emitirTextoAlterado };
