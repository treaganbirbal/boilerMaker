const Sequelize = require('sequelize');

const db = new Sequelize(provess.env.DATABASE_URL || 'postgres://localhost:5432/boilerMaker', {
    logging: false
})

module.exports = db;