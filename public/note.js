import { selecionarNote, emitirTextoAlterado, emitirExcluirNote } from './socket-front-note.js';

// Seleciona os elementos HTML que serão manipulados
const tituloHTML = document.getElementById('titulo-pagina');
const tituloNote = document.getElementById('titulo-note');
const textoNote  = document.getElementById('texto-note');
const deleteBtn  = document.getElementById('excluir-note');

// Pega o nome da anotação pelos query params
const params = new URLSearchParams(window.location.search);
const nomeNote = params.get("nome");

// Dinamiza o nome da anotação no HTML
tituloHTML.innerHTML = nomeNote || "Anotação sem título";
tituloNote.innerHTML = nomeNote || "Anotação sem título";

// Atualiza a anotação com o seu respectivo texto ao abrir
selecionarNote(nomeNote);

// Envia um evento para o servidor informando que o texto dessa anotação foi alterado
textoNote.addEventListener('keyup', () => {
    emitirTextoAlterado(nomeNote, textoNote.value);
})

// Envia um evento para o servidor informando que a anotação atual deve ser deletada
deleteBtn.addEventListener('click', () => {
    emitirExcluirNote(nomeNote);
})

// Atualiza o campo de texto com o texto passado via parâmetro
function atualizaCampoTexto(texto) {
    textoNote.value = texto
}

// Se a página atual for a mesma que foi deletada, redireciona o cliente para a tela inicial
function redirecionarAoExcluir(nome){
    if(nomeNote === nome){
        alert(`Documento "${nomeNote}" foi excluído!`);
        window.location.href = "/";
    }
}

export { atualizaCampoTexto, redirecionarAoExcluir };
