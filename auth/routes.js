const bcrypt = require('bcrypt')
const { Router } = require('express')

const User = require('../users/model')
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

  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      // check e-mail
      if (!user) {
        res.status(401).send({
          message: 'Invalid email or password'
        })
      }

      // check password
      if (bcrypt.compare(password, user.password)) {
        res.send({
          jwt: toJWT({userId: user.id})
        })
      }

      else {
        res.status(401).send({
          message: 'Invalid email or password'
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
})

module.exports =  router