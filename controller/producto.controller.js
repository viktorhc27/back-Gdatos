const { Op } = require('sequelize');
const { Producto, Categoria, Ventas, DetalleVenta } = require('../models/associations');
const ExcelJS = require('exceljs')
var controlador = {};

controlador.index = async (req, res) => {
    try {

        const result = await Producto.findAll({ include: [{ model: Categoria, as: "categoria" }] });

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


controlador.total = async (req, res) => {
    try {

        const result = await Producto.findAndCountAll()

        return res.json(result);
    } catch (Error) {
        console.error(Error);
        return res.status(500).json({
            err: Error,
            response: "Fallo del servidor"
        });
    }
}

controlador.excel = async (req, res) => {
    try {
        const productos = await Producto.findAll({ include: [{ model: Categoria, as: 'categoria' }] })
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('hoja 1')
        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Precio', key: 'precio', width: 10 },
            { header: 'Categoria', key: 'categoria', width: 20 }
        ]
        productos.forEach((producto) => {

            const newRow = {
                nombre: producto.nombre,
                precio: producto.precio,
                categoria: producto.categoria.nombre
            }
            worksheet.addRow(newRow)
        })

        // Configurar encabezados HTTP para la descarga del archivo
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');

        // Enviar el archivo Excel como una respuesta HTTP
        workbook.xlsx.write(res)
            .then(() => {
                res.end();
                console.log('Archivo Excel enviado con éxito al navegador.');
            })
            .catch((error) => {
                console.error('Error al enviar el archivo Excel:', error);
                res.status(500).send('Error interno del servidor');
            });
    } catch (Error) {
        console.error(Error);
        return res.status(500).json({
            err: Error,
            response: "Fallo del servidor"
        });
    }
}
module.exports = controlador;