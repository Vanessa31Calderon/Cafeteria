const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './CRUD.sqlite'
})

module.exports = sequelize;