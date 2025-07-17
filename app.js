const express = require('express');
const axios = require('axios');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

const cors = require('cors');

const app = express();
const portServer = 3000;

app.use(express.json()); // Middleware para req.body
app.use(cors()); // Permite requisição entre front e back
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
  return res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/notas', async (req, res) => {
  let { nome, notas } = req.body;
  const nomeLimpo = sanitizeHtml(nome, {
    allowedTags: [], // nenhuma tag HTML permitida
    allowedAttributes: {}, // nenhum atributo permitido
  }).trim();

  try {
    if (nomeLimpo.length > 0 && notas.length == 2) {
      if (isNaN(notas[0]) || isNaN(notas[1])) {
        return res.status(400).json({ usuario: { nome: nomeLimpo, notas: notas } });

      }

      notas[0] = Number(notas[0]);
      notas[1] = Number(notas[1]);

      if (notas[0] < 0 || notas[0] > 10 || notas[1] < 0 || notas[1] > 10) {
        return res.status(400).json({ usuario: { nome: nomeLimpo, notas: notas } });

      }

      await axios
        .post(`http://localhost:${portDb}/notas`, {
          nome: nomeLimpo,
          notas: notas,
        })
        .then((response) => {
          console.log('Resposta:', response.data);
        })
        .catch((error) => {
          console.error('Erro ao enviar:', error);
        });

      return res.status(201).json({ usuario: { nome: nomeLimpo, notas: notas } });

    }

    return res.status(400).json({ usuario: { nome: nomeLimpo, notas: notas } });


  } catch (error) {
    return res.status(400).json({ usuario: { nome: nomeLimpo, notas: notas } });
  }
});

app.get('/notas', async (req, res) => {
  try {
    const resposta = await axios.get(`http://localhost:${portDb}/notas`);
    return res.status(200).json(resposta.data);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: 'Erro ao buscar notas', detalhe: error.message });
  }
});

app.delete('/notas-delete', async (req, res) => {
  try {
    const resposta = await axios.get(`http://localhost:${portDb}/notas`);
    const dados = resposta.data;

    await Promise.all(
      dados.map((nota) =>
        axios.delete(`http://localhost:${portDb}/notas/${nota.id}`)
      )
    );

    return res.status(200).json({ mensagem: 'Notas apagadas com sucesso.' });
  } catch (error) {
    return res.status(400).json({
      mensagem: 'Erro ao deletar',
      erro: error.message,
    });
  }
});

app.listen(portServer, () => {
  console.log(`Servidor rodando em http://localhost:${portServer}`);
});

module.exports = app;
