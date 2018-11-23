const Sequelize = require('sequelize')

const sequelize = require('../db')

const Song = require('../songs/model')
const User = require('../users/model')

const Playlist = sequelize.define('playlist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'playlists'
})

Playlist.belongsTo(User, {onDelete: 'cascade'})
Playlist.hasMany(Song, {onDelete: 'cascade'})

module.exports = Playlist