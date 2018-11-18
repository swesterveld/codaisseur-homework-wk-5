const bcrypt = require('bcrypt')
const { Router } = require('express')
const { check, validationResult } = require('express-validator/check')

const User = require('./model')

const router = new Router()

// POST /users -- sign up user with email and password
router.post('/users', [
  check('email').isEmail(),
  check('password').isLength({min: 6})
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).send({
      errors: errors.array()
    })
  }

  const {email, password, password_confirmation} = req.body

  // validate passwords for match
  if (password !== password_confirmation)
    return res.status(400).send({
      message: 'Passwords do not match'
    })

  // create user when input has passed validation
  const user = {
    email: email,
    password: bcrypt.hashSync(password, 10)
  }

  User.create(user)
    .then(user => {
      if (!user) {
        return res.status(422).send({
          message: '(422) Unprocessable Entity'
        })
      }
      return res.status(201).send(user)
    })
    .catch(err => {
      switch (err.name) {
        case 'SequelizeUniqueConstraintError':
          return res.status(400).send({
            message: 'Email already in use'
            // Possible privacy issue, in which case it would be better to inform the already existing user by email,
            // and return an error-message like: `Can't create user with email ${email}`, or just `Can't create user`
          })
        default:
          next(err)
      }
    })
})

module.exports = router