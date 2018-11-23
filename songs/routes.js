const { Router } = require('express')
const Sequelize = require('sequelize')

const Song = require('./model')
const Playlist = require('../playlists/model')
const auth = require('../auth/middleware')

const router = new Router()
const { and } = Sequelize.Op

// TODO: implement authn and authz on routes required for Song

// POST /playlists/:id/songs -- add song to a playlist
router.post('/playlists/:id/songs', auth, (req, res, next) => {
  Playlist.findOne({
    where: {
      [and]: [
        {id:req.params.id},
        {userId: req.user.id}
      ]
    }
  })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: 'Playlist does not exist'
        })
      }

      let {title, artist, album} = req.body
      Song.create({
        title: title,
        artist: artist,
        album: album,
        playlistId: playlist.id
      })
      .then(song => {
        if (!song) {
          return res.status(404).send({
            message: 'Song does not exist'
          })
        }
        return res.status(201).send(song)
      })
      .catch(SequelizeUniqueConstraintError => {
        return res.status(422).send({
          message: 'Song already exists'
        })
      })
    })
    .catch(err => next(err))
})

module.exports = router