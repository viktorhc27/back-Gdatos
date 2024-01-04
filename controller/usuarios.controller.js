const { Op } = require('sequelize');
const { Categoria, Usuarios } = require('../models/associations');
const { kuv_lazy_table } = require('../helpers/kuv-lazy-table');
const passwordHash = require('password-hash');
const { generarJWT } = require('../helpers/generar-jwt');
const jwt = require('jsonwebtoken');
var controlador = {};
controlador.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //ver si correo si existe
        let usuario = await Usuarios.findOne({ where: { email } })
        if (!usuario) {
            return res.status(404).json({
                mensaje: 'El nombre de usuario o contraseña son incorectos.'
            })
        }

        let validarPasword = passwordHash.verify(password, usuario.password)
        if (!validarPasword) {
            return res.status(400).json(
                { internalCode: 1, mensaje: 'El nombre de usuario o la contraseña son incorrectos.' }
            );
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);

        return res.status(200).json({
            usuario,
            token
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
}

controlador.verificar_token = async (req, res) => {
    try {

        const { token } = req.body
        jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, decoded) => {
            if (err) {
                // En caso de error al verificar el token
                console.error(err);
                return res.status(401).json({
                    error: 'Token inválido',
                    response: null
                });
            } else {
                // En caso de éxito al verificar el token
                return res.status(200).json({
                    error: null,
                    response: 'Token válido',
                    decodedData: decoded // Datos decodificados del token
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
}
module.exports = controlador;