const Sequelize = require('sequelize'); // Importa el ORM Sequelize

// Inicializa la conexión con la base de datos SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite', // Lenguaje de base de datos
    storage: './CRUD.sqlite' // Ruta del archivo de la base de datos
});

module.exports = sequelize; // Exporta el módulo