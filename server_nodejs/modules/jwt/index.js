const jwt = require('jsonwebtoken')
const tokenConfig = require('../config').server
const crypto = require('../user/crypto')
const User = require('../user/model')

const findByUsername = function(username) {
  return new Promise((resolve, reject) => {
    User.find({
      username: username
    }).select('-_version -updatedAt -createdAt')
      .exec((error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
  })
}

const getToken = (req, res, next) => {
  const checkReqbody = (req) => new Promise((resolve, reject) => {
    if (!req.body.username) {
      return reject(`'username' is required`)
    }
    if (!req.body.password) {
      return reject(`'password' is required`)
    }
    return resolve()
  })

  const validateUser = (username, password) => {
    return findByUsername(username)
      .then(result => {
        if (result.length > 0 && result[0].password && crypto.matches(password, result[0].password)) {
          return Promise.resolve(result)
        } else {
          return Promise.resolve([])
        }
      })
  }

  const generateToken = (payload) => {
    const jwtConfig = tokenConfig.jwt
    return jwt.sign(payload, jwtConfig.secret, { algorithm: jwtConfig.algorithm, expiresIn: jwtConfig.expiresInMinutes * 60})
  }

  return checkReqbody(req)
    .then(() => validateUser(req.body.username, req.body.password))
    .then(result => {
      if (result && result.length > 0) {
        const payload = {
          username: result[0].username,
          firstname: result[0].firstname,
          lastname: result[0].lastname
        }
        const token = generateToken(payload)
        const message = {
          token: token,
          user: payload
        }
        return Promise.resolve(message)
      } else {
        return Promise.reject({ code: 400, message: 'Invalid username or password' })
      }
    })
    .then((message) => {
      return res.json(message)
    })
    .catch(err => {
      return err.code ? res.status(err.code).json(err.message) : res.status(400).json(err)
    })
}

const validateToken = (req, token) => {
  const readAuthorization = (authorization) => {
    return new Promise((resolve, reject) => {
      if (!authorization || !authorization.trim()) {
        return reject(`Missing Authorization`)
      }
      const parts = authorization.split(` `)
      if (parts.length !== 2 || parts[0].toLowerCase() !== `jwt` || !parts[1]) {
        return reject('Wrong Authorization')
      }
      return resolve(parts[1].trim())
    })
  }

  const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
      const jwtConfig = tokenConfig.jwt
      jwt.verify(token, jwtConfig.secret, { algorithm: jwtConfig.algorithm }, (err, decode) => {
        if (err) return reject(err)
        return resolve(decode)
      })
    })
  }

  return readAuthorization(token)
    .then((token) => decodeToken(token))
    .then((payload) => {
      return User.find({
        username: payload.username
      }).select('-_version -updatedAt -createdAt -password')
      .then((result) => {
        if (result.length > 0) {
          req.user = result[0]
          return Promise.resolve(result[0])
        } else {
          return Promise.reject({code: 401, message: 'Invalid Authorization'})
        }
      })
    })
    .catch((err) => {
      return Promise.reject(new Error(err))
    })
}

module.exports = { getToken, validateToken }
