const { DataTypes } = require('sequelize')
const db = require('../config/db')

const MetodoPagos = db.define('metodo_pagos', {
    nombre: { type: DataTypes.STRING, allowNull: false }
})

module.exports = MetodoPagos;
