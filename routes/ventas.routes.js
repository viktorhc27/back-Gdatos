const express = require('express');
const router = express.Router()
const { index, productoMasVendido,total } = require('../controller/ventas.controller');


//Routing
router.get('/index', index)
router.get('/producto_mas_vendido', productoMasVendido)
router.get('/total_ventas', total)
module.exports = router