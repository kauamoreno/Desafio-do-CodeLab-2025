const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notas.controller.js');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/api/notas', notasController.getNotas);
router.post('/api/notas', notasController.addNota);
router.delete('/api/notas/:id', notasController.deletarAluno); // Um aluno por vez
router.delete('/api/notas-delete', notasController.deleteNotas); //Limpa completa

module.exports = router;
