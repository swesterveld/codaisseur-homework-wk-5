const Sequelize = require('sequelize')

const sequelize = require('../db')

const User = require('../users/model')

const Playlist = sequelize.define('playlist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'playlists'
})

Playlist.belongsTo(User)

module.exports = Playlist