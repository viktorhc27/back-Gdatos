const { Op } = require('sequelize');
const { MetodoPagos } = require('../models/associations');

var controlador = {};

controlador.index = async (req, res) => {
    try {

        const result = await MetodoPagos.findAll();

        // const result = await Ventas.findAll({ include: { model: DetalleVenta, include: [{ model: Producto}]} });


        return res.json(result);

    } catch (Error) {
        console.error(Error);
        return res.status(500).json({
            err: Error,
            response: "Fallo del servidor"
        });
    }
}
controlador.list = async (req, res) => {
    try {

        const result = await MetodoPagos.findAll();

        return res.json(result);
    } catch (Error) {
        console.error(Error);
        return res.status(500).json({
            err: Error,
            response: "Fallo del servidor"
        });
    }
}


module.exports = controlador;