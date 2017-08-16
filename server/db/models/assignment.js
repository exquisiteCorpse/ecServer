const Sequelize = require('sequelize')
const db = require('../db')

const Assignment = db.define('assignment', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  cell: {
    type: Sequelize.ENUM('top', 'middle', 'bottom')
  }
})

module.exports = Assignment
