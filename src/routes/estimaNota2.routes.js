const express = require('express');
const router = express.Router();
const estimaNota2Controller = require('../controllers/estimaNota2.controller.js');

router.get('/api/estimaNota2', estimaNota2Controller.estimaNota2);

module.exports = router;