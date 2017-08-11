const Sequelize = require('sequelize')
const db = require('../db')

const Assignment = db.define('assignment', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Assignment
