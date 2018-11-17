const Sequelize = require('sequelize')

const sequelize = require('../db')

const User = require('../users/model')
const Song = require('../songs/model')

const Playlist = sequelize.define('playlist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER
    // TODO: implement `allowNull: false` once auth{n,z} is supported
  }
}, {
  tableName: 'playlists'
})

Playlist.belongsTo(User)
Playlist.hasMany(Song)

module.exports = Playlist