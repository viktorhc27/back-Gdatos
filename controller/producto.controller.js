const { Op, Sequelize } = require('sequelize');
const { Producto, Categoria, Ventas, DetalleVenta } = require('../models/associations');
const ExcelJS = require('exceljs');
const { kuv_lazy_table } = require('../helpers/kuv-lazy-table');
const moment = require('moment'); // require
const db = require('../config/db');
var controlador = {};

controlador.index = async (req, res) => {
    try {
        let opts = kuv_lazy_table(req.body)

        opts.include = [{ model: Categoria, as: 'categoria' }]

        const result = await Producto.findAndCountAll(opts);

        return res.json({
            elements: result.rows,
            count: result.count
        });
        //  const result = await Producto.findAll({ include: [{ model: Categoria, as: "categoria" }] });

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
controlador.save = async (req, res) => {
    try {
        let producto = req.body.producto;
        console.log(producto);
        let model = await Producto.create(producto);
        return res.json({ response: "Agregado Correctamente", id: model.id });


    } catch (error) {
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
}
controlador.upload = async (req, res) => {
    try {
        let file = req.files.image;
        console.log(file.image);
        // Convierte idUser a número si es necesario
        let userId = parseInt(req.body.idUser, 10);

        let type = "." + file.mimetype.split('/')[1];
        let nombre = `${userId}_${Date.now()}${type}`;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ response: 'No files were uploaded.' });
        }
        await Producto.update({ img: nombre }, { where: { id: req.body.idUser } })
        file.mv(`./uploads/${nombre}`, err => {
            if (err) return res.status(500).send({ message: err });

            return res.status(200).send({ message: 'File uploaded successfully', nombre });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
}
controlador.view = async (req, res) => {
    try {
        let id = req.params.id

        let producto = await Producto.findByPk(id)
        return res.json(producto)

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
        let post = req.body.producto

        let producto = await Producto.update(post, { where: { id: post.id } })
        return res.json({ reposnse: "Actualizado con éxito" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
}
controlador.reporte_meses = async (req, res) => {
    try {
        let fechaInicio = moment(req.body.fecha_inicio);
        let fechaFinal = moment(req.body.fecha_final);
        let fechaFormateadaInicio = fechaInicio.format('YYYY-MM-DD') + ' 00:00:00';
        let fechaFormateadaFinal = fechaFinal.format('YYYY-MM-DD') + ' 23:59:59';
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let reporteMeses = [];
        let mesesDiferencia = fechaFinal.diff(fechaInicio, 'month');
        let aux = fechaInicio.month();
        let fecha = fechaInicio.clone();

        for (let i = 0; i <= mesesDiferencia; i++) {
            reporteMeses.push({
                mes: meses[aux],
                año: fecha.format('YYYY'),
                total: 0
            });
            aux = (aux === 11) ? 0 : aux + 1;
            fecha.add(1, 'month');
        }


        let reporte = await Ventas.findAll({
            attributes: [
                [db.fn('YEAR', db.col('fecha')), 'año'],
                [db.fn('MONTH', db.col('fecha')), 'mes'],
                [db.fn('SUM', db.col('total')), 'total']
            ],
            where: {
                fecha: {
                    [Op.between]: [fechaFormateadaInicio, fechaFormateadaFinal]
                }
            },
            group: [
                db.fn('YEAR', db.col('fecha')),
                db.fn('MONTH', db.col('fecha'))
            ]
        });


        for (let i = 0; i < reporte.length; i++) {

            let aux = reporte[i].dataValues.mes - 1
            reporteMeses[aux].total = parseInt(reporte[i].dataValues.total)

        }

        return res.json({ fechaFormateadaInicio, fechaFormateadaFinal, mesesDiferencia, reporteMeses});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
};

module.exports = controlador;