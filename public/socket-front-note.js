import { atualizaCampoTexto } from "./note.js";

const socket = io();

// Emite um evento para o servidor para indicar que um cleinte entrou nessa anotação
function selecionarNote(nomeNote){
    socket.emit('selecionar_note', nomeNote);
}

// Emite um evento para o servidor informando que o texto dessa anotação foi alterado
function emitirTextoAlterado(nomeNote, textoNote){
    socket.emit('texto_alterado', nomeNote, textoNote);
}

// Atualiza o conteúdo do campo de texto com o novo texto recebido do servidor
socket.on('atualizar_texto', (texto) => {
    atualizaCampoTexto(texto);
})

export { 
    selecionarNote,
    emitirTextoAlterado
};
