const express = require('express')
const router = new express.Router()
const handler = require('./handler')
const { validateToken } = require('../jwt')
const role = require('../user').role

router.post('/:postId', (req, res, next) => {
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
  return handler.findCommentList(req)
    .then((items) => {
      res.json(items)
    })
})

router.get('/post/:postId', (req, res, next) => {
  return handler.findCommentByPost(req)
  .then((items) => {
    res.json(items)
  })
})

router.delete('/:id', (req, res, next) => {
  return validateToken(req, req.headers.authorization)
  .then((user) => {
    return handler.deleteComment(req)
      .then((item) => {
        res.status(200).json(item)
      })
      .catch((err) => Promise.reject(new Error(err)))
  })
  .catch((err) => {
    err.code ? res.status(err.code).json(err.message) : res.status(400).json(err.message)
  })
})

router.put('/:id', (req, res, next) => {
  return validateToken(req, req.headers.authorization)
  .then((user) => {
    return handler.updateComment(req, req.params.id)
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