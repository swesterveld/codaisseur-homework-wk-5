const Sequelize = require('sequelize')
const sequelize = require('../db')

const Playlist = sequelize.define('playlist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'playlists'
})

module.exports = Playlist