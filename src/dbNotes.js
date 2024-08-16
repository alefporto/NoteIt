import { notesCollection } from "./dbConnect.js";

// Obtém todas as anotações do banco de dados e as retorna em um array
function getAllNotes() {
    return notesCollection.find().toArray()
}

// Obtém uma anotação de acordo com o nome dela
function findNote(nomeNote) {
    return notesCollection.findOne({ tittle: nomeNote });
}

// Cria uma nota anotação no banco de dados com o nome passado no input
function createNote(nomeNote) {
    return notesCollection.insertOne({
        tittle: nomeNote,
        text: ""
    })
}

// Atualiza o texto de uma anotação no banco de dados de acordo com o nome dela
function updateNote(nomeNote, textoNote) {
    return notesCollection.updateOne(
        { tittle: nomeNote },
        { $set: { text: textoNote } })
}

export {
    getAllNotes,
    findNote,
    createNote,
    updateNote
};
