import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let notesCollection;

try {
    await client.connect();

    const database = client.db('note_it');
    notesCollection = database.collection('notes');

    console.log("Conectado com sucesso ao banco de dados");
} catch (err) {
    console.log(err.message);
}

export { notesCollection };
