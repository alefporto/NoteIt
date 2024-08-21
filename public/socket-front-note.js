import { atualizaCampoTexto, redirecionarAoExcluir } from "./note.js";

const socket = io();

// Emite um evento para o servidor para indicar que um cliente entrou nessa anotação
function selecionarNote(nomeNote) {
    // Passa o nome da anotação e uma função callback que faz a lógica de atualizar o campo de texto com o que está no banco
    socket.emit('selecionar_note', nomeNote, (textoNote) => {
        atualizaCampoTexto(textoNote);
    });
}

// Emite um evento para o servidor informando que o texto dessa anotação foi alterado
function emitirTextoAlterado(nomeNote, textoNote) {
    socket.emit('texto_alterado', nomeNote, textoNote);
}

// Emite um evento para o servidor informando que uma anotação está sendo deletada
function emitirExcluirNote(nomeNote){
    socket.emit('excluir_note', nomeNote);
}

// Atualiza o conteúdo do campo de texto com o novo texto recebido do servidor
socket.on('atualizar_texto', (texto) => {
    atualizaCampoTexto(texto);
})

// Redireciona para a tela inicial os clientes que estiverem no documento que foi excluído
socket.on('note_excluida', (nomeNote) => {
    redirecionarAoExcluir(nomeNote);
})

export {
    selecionarNote,
    emitirTextoAlterado,
    emitirExcluirNote
};
