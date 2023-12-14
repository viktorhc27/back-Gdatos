const { Op } = require('sequelize');
const {Categoria } = require('../models/associations');

var controlador = {};

controlador.index = async (req, res) => {
    try {

         const result = await Categoria.findAll(); 

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

        const result = await Categoria.findAll();

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