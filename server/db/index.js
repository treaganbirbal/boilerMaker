const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/boilerMaker', {
    logging: false
})

module.exports = db;