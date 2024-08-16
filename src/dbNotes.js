import { notesCollection } from "./dbConnect.js";

// Obtém todas as anotações do banco de dados e as retorna em um array
function getAllNotes(){
    return notesCollection.find().toArray()
}

export { getAllNotes };