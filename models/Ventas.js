const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Ventas = db.define('ventas', {
    fecha: { type: DataTypes.DATE, allowNull: false },
    total: { type: DataTypes.NUMBER, allowNull: false },
    metodo_pagos_id: { type: DataTypes.NUMBER, allowNull: false },
    metodo_pagos_id: { type: DataTypes.NUMBER, allowNull: false }
    
})

module.exports = Ventas;