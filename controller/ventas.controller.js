const { Op, Sequelize } = require('sequelize');
const { Ventas, Producto, Categoria, DetalleVenta } = require('../models/associations');
const db = require('../config/db');
const moment = require('moment'); // require
var controlador = {};

controlador.index = async (req, res) => {
    try {
        let Vmeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let Nmeses = [
            { name: 'Enero', value: 0, value: 0 },
            { name: 'Febrero', value: 0, total: 0 },
            { name: 'Marzo', value: 0, total: 0 },
            { name: 'Abril', value: 0, total: 0 },
            { name: 'Mayo', value: 0, total: 0 },
            { name: 'Junio', value: 0, total: 0 },
            { name: 'Julio', value: 0, total: 0 },
            { name: 'Agosto', value: 0, total: 0 },
            { name: 'Septiembre', value: 0, total: 0 },
            { name: 'Octubre', value: 0, total: 0 },
            { name: 'Noviembre', value: 0, total: 0 },
            { name: 'Diciembre', value: 0, total: 0 }
        ];


        const result = await Ventas.findAll();

        for (let i = 0; i < result.length; i++) {
            let fechas = result[i].fecha.toString().split(' ');

            switch (fechas[1]) {
                case 'Jan':
                   // Nmeses[0].value += 1;
                    Nmeses[0].value += result[i].total;
                    break;
                case 'Feb':
                  //  Nmeses[1].value += 1;
                    Nmeses[1].value += result[i].total;
                    break;
                case 'Mar':
                  //  Nmeses[2].value += 1;
                    Nmeses[2].value += result[i].total;
                    break;
                case 'Apr':
                    //Nmeses[3].value += 1;
                    Nmeses[3].value += result[i].total;
                    break;
                case 'May':
                  //  Nmeses[4].value += 1;
                    Nmeses[4].value += result[i].total;
                    break;
                case 'Jun':
                 //   Nmeses[5].value += 1;
                    Nmeses[5].value += result[i].total;
                    break;
                case 'Jul':
                   // Nmeses[6].value += 1;
                    Nmeses[6].value += result[i].total;
                    break;
                case 'Aug':
                 //   Nmeses[7].value += 1;
                    Nmeses[7].value += result[i].total;
                    break;
                case 'Sep':
                   // Nmeses[8].value += 1;
                    Nmeses[8].value += result[i].total;
                    break;
                case 'Oct':
                  //  Nmeses[9].value += 1;
                    Nmeses[9].value += result[i].total;
                    break;
                case 'Nov':
                 //   Nmeses[10].value += 1;
                    Nmeses[10].value += result[i].total;
                    break;
                case 'Dec':
                 //   Nmeses[11].value += 1;
                    Nmeses[11].value += result[i].total;
                    break;
            }
        }

        // const result = await Ventas.findAll({ include: { model: DetalleVenta, include: [{ model: Producto}]} });


        return res.json({ response: result, meses: Nmeses });

    } catch (Error) {
        console.error(Error);
        return res.status(500).json({
            err: Error,
            response: "Fallo del servidor"
        });
    }
}

controlador.productoMasVendido = async (req, res) => {
    try {
        const result = await Producto.findAll({
            attributes: [
                'id',
                'nombre',
                [Sequelize.literal('SUM(`detalle_venta`.`cantidad`)'), 'totalVendido']
            ],
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['id', 'nombre']
                },
                {
                    model: DetalleVenta,
                    attributes: []
                }
            ],
            group: ['Productos.id'], // Agrupa por el id del producto
            order: [[Sequelize.literal('totalVendido'), 'DESC']] // Ordena por la cantidad vendida descendente
        });

        return res.json(result);


    } catch (Error) {
        console.error(Error);
        return res.status(500).json({
            err: Error,
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
                anho: fecha.format('YYYY'),
                total: 0
            });
            aux = (aux === 11) ? 0 : aux + 1;
            fecha.add(1, 'month');
        }


        let reporte = await Ventas.findAll({
            attributes: [
                [db.fn('YEAR', db.col('fecha')), 'anho'],
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

        return res.json(reporteMeses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            response: "Fallo del servidor"
        });
    }
};
controlador.total = async (req, res) => {
    try {

        const result = await Ventas.findAndCountAll()

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