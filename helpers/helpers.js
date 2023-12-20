const { Nutriente } = require('../modules/associations')
const { response, request } = require('express');
const { Op } = require('sequelize');

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

/**
 * Esta función se utiliza para formatear un número con un número específico de decimales. Si el
 * número no es un número válido, se devuelve un mensaje de error especificado.
 * @param {number} num - El número a formatear.
 * @param {number} [minDecimal=0] - El número mínimo de decimales a incluir en el número
 * formateado.
 * @param {number} [maxDecimal=2] - El número máximo de decimales a incluir en el número
 * formateado.
 * @param {string} [errMsg='N.D.'] - El mensaje de error a devolver si el número no es válido.
 * @returns {string} El número formateado con el número especificado de decimales, o el mensaje de
 * error si el número no es válido.
 */
const numberFormat = (num, minDecimal = 0, maxDecimal = 2, errMsg = 'N.D.') => {
    try {
      return num.toLocaleString('es-CL', { minimumFractionDigits: minDecimal, maximumFractionDigits: maxDecimal });
    } catch (error) {
      return errMsg;
    }
}

module.exports = {
    formatDate,
    numberFormat
}