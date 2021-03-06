const express = require('express')
const bodyParser = require('body-parser')

const loginsRouter = require('./auth/routes')
const usersRouter = require('./users/routes')
const playlistsRouter = require('./playlists/routes')
const songsRouter = require('./songs/routes')

const app = express()
const port = process.env.PORT || 8080

app
  .use(bodyParser.json())
  .use(loginsRouter)
  .use(usersRouter)
  .use(playlistsRouter)
  .use(songsRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))