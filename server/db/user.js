 const Sequelize = require('sequelize')
const db = require('../db/database')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        get(){
            return () => this.getDataValue('password')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get(){
            return () => this.getDataValue('salt')
        }
    },
    googleId: {
        type: Sequelize.STRING
    }
})

module.export ={
    User 
}