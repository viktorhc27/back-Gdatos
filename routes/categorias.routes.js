const express = require('express');
const router = express.Router()
const { index, total, save,update } = require('../controller/categoria.controller');
;



//Routing
router.get('/index', index)
router.post('/save', update)
module.exports = router