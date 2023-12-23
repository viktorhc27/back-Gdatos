const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Productos = db.define('productos', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.NUMBER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    categoria_id: DataTypes.NUMBER
}, {
})

module.exports = Productos;
