const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Categoria = db.define('categoria', {
    nombre: { type: DataTypes.STRING, allowNull: false }
})

module.exports = Categoria;