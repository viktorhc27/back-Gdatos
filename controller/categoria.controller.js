const { Op } = require('sequelize');
const { Categoria } = require('../models/associations');

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
controlador.save = async (req, res) => {
    try {

        let categorias = req.body.categoria

        await Categoria.create({ nombre: categorias.nombre })

        res.json({ response: "Creado éxitosamente" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
}
controlador.update = async (req, res) => {
    try {

        let categorias = req.body.categoria

        await Categoria.update(categorias, { where: { id: categorias.id } })

        res.json({ response: "modificado éxitosamente" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
}

module.exports = controlador;