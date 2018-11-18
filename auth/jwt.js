const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || "27-XZ/YyWzVk9dwztVvcdwD3znSlf8"

function toJWT(data) {
  return jwt.sign(data, secret, {expiresIn: '10h'})
}

function toData(token) {
  return jwt.verify(token, secret)
}

module.exports = { toJWT, toData }