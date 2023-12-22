const express = require('express');
const router = express.Router()
const { index, productoMasVendido, total, reporte_meses } = require('../controller/ventas.controller');
const { validarFecha } = require('../middlewares/validar-fecha');


//Routing
router.get('/index', index)
router.get('/producto_mas_vendido', productoMasVendido)
router.get('/total_ventas', total)
router.post('/reporte_meses',  reporte_meses)
module.exports = router