const axios = require('axios');
const sanitizeHtml = require('sanitize-html');

const portaDb = 3001;
const baseURL = `http://localhost:${portaDb}/notas`;

exports.getNotas = async (req, res) => {
  try {
    const resposta = await axios.get(baseURL);
    return res.status(200).json(resposta.data);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: 'Erro ao buscar notas', detalhe: error.message });
  }
};

exports.addNota = async (req, res) => {
  let { nome, notas } = req.body;

  const nomeLimpo = sanitizeHtml(nome, {
    allowedTags: [], // nenhuma tag HTML permitida
    allowedAttributes: {}, // nenhum atributo permitido
  }).trim();

  try {
    if (nomeLimpo.length > 0 && notas.length == 2) {
      if (isNaN(notas[0]) || isNaN(notas[1])) {
        return res
          .status(400)
          .json({ usuario: { nome: nomeLimpo, notas: notas } });
      }

      notas[0] = Number(notas[0]);
      notas[1] = Number(notas[1]);

      if (notas[0] < 0 || notas[0] > 10 || notas[1] < 0 || notas[1] > 10) {
        return res
          .status(400)
          .json({ usuario: { nome: nomeLimpo, notas: notas } });
      }

      await axios
        .post(baseURL, {
          nome: nomeLimpo,
          notas: notas,
        })
        .then((response) => {
          console.log('Resposta:', response.data);
        })
        .catch((error) => {
          console.error('Erro ao enviar:', error);
        });

      return res
        .status(201)
        .json({ usuario: { nome: nomeLimpo, notas: notas } });
    }

    return res.status(400).json({ usuario: { nome: nomeLimpo, notas: notas } });
  } catch (error) {
    return res.status(400).json({ usuario: { nome: nomeLimpo, notas: notas } });
  }
};

exports.deleteNotas = async (req, res) => {
  try {
    const resposta = await axios.get(baseURL);
    const dados = resposta.data;

    await Promise.all(
      dados.map((nota) =>
        axios.delete(`${baseURL}/${nota.id}`)
      )
    );

    return res.status(200).json({ mensagem: 'Notas apagadas com sucesso.' });
  } catch (error) {
    return res.status(400).json({
      mensagem: 'Erro ao deletar',
      erro: error.message,
    });
  }
};
