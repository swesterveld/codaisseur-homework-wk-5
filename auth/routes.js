const { Router } = require('express')

const { toJWT } = require('./jwt')

const router = new Router()

// POST /tokens -- sign in user with email and password to return a token
router.post('/tokens', (req, res, next) => {
  const {email, password} = req.body

  if(!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }

  let id = 1 || null // TODO: set id to ID from users table, based on given credentials

  res.send({
    jwt: toJWT({userId: id})
  })
})

module.exports =  router