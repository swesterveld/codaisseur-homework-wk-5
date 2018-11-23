const bcrypt = require('bcrypt')
const { Router } = require('express')

const User = require('../users/model')
const { toJWT } = require('./jwt')

const router = new Router()

// POST /tokens -- sign in user with email and password to return a token
router.post('/tokens', (req, res, next) => {
  const {email, password} = req.body

  const unauthorized = (res) => {
    res.status(401)
      .json({
        message: 'Invalid login credentials'
      })
  }

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
        return unauthorized(res)
      }

      // check password
      return bcrypt.compare(password, user.password)
        .then(match => {
          if (!match) {
            return unauthorized(res)
          }
          return res.status(200).send({
            jwt: toJWT({userId: user.id})
          })
        })
        .catch(() => unauthorized(res))
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
})

module.exports =  router