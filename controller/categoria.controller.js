const { Op } = require('sequelize');
const { Categoria } = require('../models/associations');
const { kuv_lazy_table } = require('../helpers/kuv-lazy-table');
var controlador = {};

controlador.index = async (req, res) => {
    try {
        let opts = kuv_lazy_table(req.body)

        const result = await Categoria.findAndCountAll(opts);

        return res.json({
            elements: result.rows,
            count: result.count
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
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

controlador.view = async (req, res) => {
    try {

        let id = req.params.id
        let model = await Categoria.findByPk(id)
        return res.status(200).json(model)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
}
module.exports = controlador;