const { DataTypes } = require('sequelize')
const db = require('../config/db')

const DetalleVenta = db.define('detalle_venta', {
    producto_id: { type: DataTypes.NUMBER, allowNull: false },
    venta_id: { type: DataTypes.NUMBER, allowNull: false },
    cantidad: { type: DataTypes.NUMBER, allowNull: false },
    sub_total: { type: DataTypes.NUMBER, allowNull: false }
    
})

module.exports = DetalleVenta;
