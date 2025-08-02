const express = require('express');
const path = require('path');
const cors = require('cors');

require('./service/notas.service') // Json-server

const routesNotas = require('./routes/notas.routes');
const routesEstimaNota2 = require('./routes/estimaNota2.routes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite requisição entre front e back
app.use(express.json()); // Para ler JSON no body das requisições
app.use(express.static(path.join(__dirname, '../public'))); // Serve arquivos estáticos da pasta public

// Rotas
app.use(routesNotas);
app.use(routesEstimaNota2);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor Express rodando em http://localhost:${PORT}`);
});

module.exports = app;