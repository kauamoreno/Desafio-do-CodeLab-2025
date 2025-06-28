const express = require('express');
const path = require('path');

const app = express();
const portServer = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//------------------------------------------------------------------------
const portDb = 3001;
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'notas.json'));

server.use(router);

server.listen(portDb, () => {
    console.log(`Json-Server rodando em http://localhost:${portDb}/notas`);
});
//------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(portServer, () => {
    console.log(`Servidor rodando em http://localhost:${portServer}`);
});