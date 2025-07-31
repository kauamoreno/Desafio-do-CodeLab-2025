const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notas.controller.js');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notas', notasController.getNotas);
router.post('/notas', notasController.addNota);
router.delete('/notas-delete', notasController.deleteNotas);

module.exports = router;
