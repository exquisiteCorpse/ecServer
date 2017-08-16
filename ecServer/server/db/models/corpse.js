const Sequelize = require('sequelize')
const db = require('../db')

const Corpse = db.define('corpse', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalCells: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Corpse