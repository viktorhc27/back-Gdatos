const express = require('express');
const router = express.Router()
const { index, total, excel } = require('../controller/producto.controller');



//Routing
router.get('/index', index)
router.get('/total', total)
router.get('/excel', excel)



module.exports = router