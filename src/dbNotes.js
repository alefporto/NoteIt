import { notesCollection } from "./dbConnect.js";

// Obtém todas as anotações do banco de dados e as retorna em um array
function getAllNotes() {
    return notesCollection.find().toArray()
}

// Obtém uma anotação de acordo com o nome dela
function findNote(nomeNote) {
    return notesCollection.findOne({ tittle: nomeNote });
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
    updateNote
};
