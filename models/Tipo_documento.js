const { DataTypes } = require('sequelize')
const db = require('../config/db')

const TipoDocumento = db.define('tipo_documento', {
    nombre: { type: DataTypes.STRING, allowNull: false }
})

module.exports = TipoDocumento;