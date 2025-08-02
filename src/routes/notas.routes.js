const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notas.controller.js');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/api/notas', notasController.getNotas);
router.post('/api/notas', notasController.addNota);
router.delete('/api/notas-delete', notasController.deleteNotas);

module.exports = router;
