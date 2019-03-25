const express = require('express')
const router = new express.Router()
const handler = require('./handler')
const { validateToken } = require('../jwt')
const role = require('../user').role

router.post('item/:itemId', (req, res, next) => {
  return validateToken(req, req.headers.authorization)
    .then((user) => {
      const data = req.body
      return handler.create(req)
        .then((item) => {
          res.status(200).json(item)
        })
        .catch((err) => Promise.reject(new Error(err)))
    })
    .catch((err) => {
      err.code ? res.status(err.code).json(err.message) : res.status(400).json(err.message)
    })
})

router.get('/:id', (req, res, next) => {
  return handler.findById(req.params.id)
  .then((item) => {
    res.json(item)
  })
})

router.get('/', (req, res, next) => {
  return handler.findPostList(req)
    .then((items) => {
      res.json(items)
    })
})

router.get('/item/:itemId', (req, res, next) => {
  return handler.findPostByItem(req)
  .then((items) => {
    res.json(items)
  })
})

router.delete('/:id', (req, res, next) => {
  return validateToken(req, req.headers.authorization)
  .then((user) => {
    return handler.deletePost(req, req.params.id)
      .then((item) => {
        res.status(200).json(item)
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
    return handler.updatePost(req, req.params.id)
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