const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Usuarios = db.define('usuarios', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    app: DataTypes.STRING,
    apm: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmado: DataTypes.STRING,
    
})

module.exports = Usuarios;
