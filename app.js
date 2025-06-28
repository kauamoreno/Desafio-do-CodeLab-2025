const express = require('express');
const axios = require('axios');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

const app = express();
const portServer = 3000;

app.use(express.json()); // Middleware para req.body
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

app.post('/notas', async (req, res) => {

    const { nome, notas } = req.body;
    const nomeLimpo = sanitizeHtml(nome, {
        allowedTags: [], // nenhuma tag HTML permitida
        allowedAttributes: {} // nenhum atributo permitido
    });

    try {
        if (nomeLimpo.trim().length > 0 && notas.length == 2) {

            if(isNaN(notas[0]) || isNaN(notas[1])) {
                res.status(400).json({ mensagem: "As notas precisam ser números" });
            }

            if(notas[0] < 0 || notas[0] > 10 || notas[1] < 0 || notas[1] > 10){
                res.status(400).json({ mensagem: "As notas precisam ser números de 0 a 10" });
            }

            await axios.post(`http://localhost:${portDb}/notas`, {
                nome: nomeLimpo,
                notas: notas
            }).then(response => {
                console.log('Resposta:', response.data);
            }).catch(error => {
                console.error('Erro ao enviar:', error);
            });

            res.status(201).json({ mensagem: "Usuario criado com sucesso" });
        }

        res.status(400).json({ mensagem: "faltando campo obrigatório" });
    } catch (error) {
        res.status(400).json({ mensagem: error });
    }
})


app.listen(portServer, () => {
    console.log(`Servidor rodando em http://localhost:${portServer}`);
});