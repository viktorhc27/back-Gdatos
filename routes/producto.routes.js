const express = require('express');
const router = express.Router()
const { index, total, excel, save, upload, view, update, reporte_meses } = require('../controller/producto.controller');



//Routing
router.post('/index', index)
router.get('/total', total)
router.get('/excel', excel)
router.get('/view/:id', view)
router.post('/save', save)
router.post('/update', update)
router.post('/upload', upload)
router.post('/reporte_meses', reporte_meses)



module.exports = router