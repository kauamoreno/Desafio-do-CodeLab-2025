const jsonServer = require('json-server');
const path = require('path');

const portaDb = 3001;
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../notas.json'));

// Middlewares padrao
server.use(jsonServer.defaults());
server.use(router);

server.listen(portaDb, () => {
  console.log(`Json-Server rodando em http://localhost:${portaDb}/notas`);
});