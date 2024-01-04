const express = require('express');
const router = express.Router()
const { login,verificar_token } = require('../controller/usuarios.controller');



//Routing
router.post('/login', login)
router.post('/verificar_token', verificar_token)
module.exports = router