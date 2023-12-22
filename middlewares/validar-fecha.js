
const { response } = require('express')


const validarFecha = (req, res = response, next) => {

    const fechaInicio = moment(req.body.fecha_inicio, 'YYYY-MM-DD');
    const fechaFinal = moment(req.body.fecha_final, 'YYYY-MM-DD');

    // Validación de fechas
    if (!fechaInicio.isValid() || !fechaFinal.isValid()) {
        return res.json({ response: "Fechas no válidas" });
    }

    // Ignorar la parte de tiempo
    fechaInicio.startOf('day');
    fechaFinal.startOf('day');

    // Comparación de fechas
    if (fechaInicio.isAfter(fechaFinal)) {
        console.log('Fecha incorrecta');
        return res.json({ response: "Fecha incorrecta" });
    }

    next();
}
module.exports = {
    validarFecha
}