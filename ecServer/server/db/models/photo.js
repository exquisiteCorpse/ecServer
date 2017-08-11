
const Sequelize = require('sequelize')
const db = require('../db')

const Photo = db.define('photo', {
  imgUrl: {
    type: Sequelize.STRING,
  },
  cell: {
    type: Sequelize.ENUM('top', 'middle', 'bottom')
  }
})

module.exports = Photo
