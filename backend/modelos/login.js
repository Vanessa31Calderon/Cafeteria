const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const Login = sequelize.define('Login', {
  no_Empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true // Clave primaria: número de empleado
  },
  contraseña: {
    type: DataTypes.STRING // Contraseña del usuario
  }
}, {
  tableName: 'Login', // Usa el nombre exacto de la tabla
  freezeTableName: true, // Evita que Sequelize cambie el nombre de la tabla
  timestamps: false // No agrega campos de fecha de creación/actualización
});

module.exports = Login; // Exporta el modelo login