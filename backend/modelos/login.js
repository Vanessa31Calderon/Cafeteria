const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const Login = sequelize.define('Login', {
  no_Empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  contraseña: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'Login', // Fuerza el nombre exacto
  freezeTableName: true, // ← ¡Agrega esto!
  timestamps: false
});

module.exports = Login;