const { Router } = require('express')
const Sequelize = require('sequelize')

const Playlist = require('./model')
const Song = require('../songs/model')
const auth = require('../auth/middleware')

const router = new Router()
const { and } = Sequelize.Op

// POST /playlists -- create a user's playlist
router.post('/playlists', auth, (req, res, next) => {
  const playlist = {
    name: req.body.name,
    userId: req.user.id
  }
  Playlist.create(playlist)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: 'Playlist does not exist'
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(err => next(err))
})

// GET /playlists -- retrieve all user's playlists
router.get('/playlists', auth, (req, res, next) => {
  Playlist.findAll({where: {userId: req.user.id}})
    .then(playlists => {
      let rc = playlists.length ? 200 : 404
      res.status(rc).send({
        playlists
      })
    })
    .catch(err => next(err))
})

// GET /playlists/:id -- get a single of user's playlists, including its songs
router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist.findOne({
    include: [Song],
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
      return res.status(200).send(playlist)
    })
    .catch(err => next(err))
})

// DELETE /playlists/:id -- delete a user's playlist, including its songs
router.delete('/playlists/:id', auth, (req, res, next) => {
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
      return playlist.destroy()
        .then(() => res.status(204).send({}))
    })
    .catch(err => next(err))
})

module.exports = router