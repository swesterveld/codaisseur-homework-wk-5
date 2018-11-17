const Sequelize = require('sequelize')

const sequelize = require('../db')

const Song = require('../songs/model')

const Playlist = sequelize.define('playlist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'playlists'
})

Playlist.hasMany(Song, {onDelete: 'cascade'})

module.exports = Playlist