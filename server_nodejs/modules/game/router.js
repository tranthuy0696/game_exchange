const express = require('express')
const router = new express.Router()
const handler = require('./handler')
const { validateToken } = require('../jwt')
const role = require('../user').role

router.post('/', (req, res, next) => {
  return validateToken(req, req.headers.authorization)
    .then((user) => {
      if (!role.isAdmin(user)) {
        res.status(403).json('Access denied')
        return
      }
      const data = req.body
      return handler.create(req)
        .then((game) => {
          res.status(200).json(game)
        })
        .catch((err) => Promise.reject(new Error(err)))
    })
    .catch((err) => {
      err.code ? res.status(err.code).json(err.message) : res.status(400).json(err.message)
    })
})

router.get('/:id', (req, res, next) => {
  return handler.findById(req.param.id)
  .then((game) => {
    res.json(game)
  })
})

router.get('/', (req, res, next) => {
  return handler.findGameList(req)
    .then((games) => {
      res.json(games)
    })
})

router.delete('/:id', (req, res, next) => {
  return validateToken(req, req.headers.authorization)
  .then((user) => {
    return handler.deleteGame(req)
      .then((game) => {
        res.status(200).json(game)
      })
      .catch((err) => Promise.reject(new Error(err)))
  })
  .catch((err) => {
    err.code ? res.status(err.code).json(err.message) : res.status(400).json(err.message)
  })
})

router.post('/:id', (req, res, next) => {
  return validateToken(req, req.headers.authorization)
  .then((user) => {
    return handler.updateGame(req, req.params.id)
      .then((item) => {
        res.status(200).json(item)
      })
      .catch((err) => Promise.reject(new Error(err)))
  })
  .catch((err) => {
    err.code ? res.status(err.code).json(err.message) : res.status(400).json(err.message)
  })
})

module.exports = router