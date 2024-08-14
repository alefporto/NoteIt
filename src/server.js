import express from 'express';
import url from 'url' // Para manipular URLs
import path from 'path' // Para manipular caminhos de arquivos
import http from 'http'; // Para criar um servidor HTTP
import { Server } from 'socket.io'; // Para criar um servidor WebSocket
import 'dotenv/config'; // Variáveis de ambiente
import './dbConnect.js'; // Conexão com o banco de dados

const app = express();

const PORT = process.env.PORT ?? 3000;

const currentPath = url.fileURLToPath(import.meta.url); // Pega a URL atual do arquivo server.js e converte pra path
const publicDirectory = path.join(currentPath, "../..", "public") // Cria o caminho para a pasta public
app.use(express.static(publicDirectory)); // Serve os arquivos da pasta public pro Express

const HttpServer = http.createServer(app)
HttpServer.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });

const io = new Server(HttpServer);

export default io;
