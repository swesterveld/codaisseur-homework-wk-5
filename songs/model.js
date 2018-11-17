const Sequelize = require('sequelize')

const sequelize = require('../db')

const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    unique: 'compositeIndex',
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    unique: 'compositeIndex',
    allowNull: false
  },
  album: {
    type: Sequelize.STRING,
    unique: 'compositeIndex',
    allowNull: false
  }
}, {
  tableName: 'songs'
})

module.exports = Song