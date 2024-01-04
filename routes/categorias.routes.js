const express = require('express');
const router = express.Router()
const { index, total, list,save,update, view } = require('../controller/categoria.controller');
;



//Routing
router.post('/index', index)
router.get('/list', list)
router.get('/view/:id', view)
router.post('/save', save)
router.put('/update', update)
module.exports = router