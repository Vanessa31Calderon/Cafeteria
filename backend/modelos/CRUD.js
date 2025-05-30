const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const CRUD = sequelize.define('CRUD', {
    folio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreCliente: { type: DataTypes.STRING },
    numeroPersonas: { type: DataTypes.INTEGER },
    numeroMesa: { type: DataTypes.INTEGER },
    fechaReservacion: { type: DataTypes.STRING },
    horaReservacion: { type: DataTypes.STRING },
    informacionContacto: { type: DataTypes.STRING }
}, {
    tableName: 'CRUD',
    timestamps: false
});

module.exports = CRUD;