const { Router } = require('express')
const Playlist = require('./model')

const router = new Router()

// TODO: implement routes required for Playlist

// POST /playlists -- create a user's playlist
router.post('/playlists', (req, res, next) => {
  console.log('res: ', res)
  Playlist
    .create(req.body)
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
router.get('/playlists', (req, res, next) => {
  Playlist.findAll()
    .then(playlists => {
      res.send({
        playlists
      })
    })
    .catch(err => next(err))
})

// GET /playlists/:id -- get a single of user's playlists, including its songs

// DELETE /playlists/:id -- delete a user's playlist, including its songs

module.exports = router