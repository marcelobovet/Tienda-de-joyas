const express = require('express');
const router = express.Router()
const joyasServices = require('../services/joyas');

router.get('/', joyasServices.reportarConsulta, joyasServices.getJoyas);
router.get('/filtros', joyasServices.reportarConsulta, joyasServices.getJoyasFiltros);

module.exports = router;