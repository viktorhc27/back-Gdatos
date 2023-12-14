const express = require('express');
const router = express.Router()
const { index, total } = require('../controller/categoria.controller');


//Routing
router.get('/index', index)
module.exports = router