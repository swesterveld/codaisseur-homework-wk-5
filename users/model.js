const Sequelize = require('sequelize')

const sequelize = require('../db')

const Playlist = require('../playlists/model')

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
})

User.hasMany(Playlist, {onDelete: 'cascade'})

module.exports = User