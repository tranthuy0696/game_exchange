const express = require('express')
const router = new express.Router()
const {validateToken} = require('../jwt')

// Other requests
router.use('/auth', require('../auth').router)
// router.get('/validateToken', validateToken)
// router.use('/users', require('../user').router)
router.use('/games', require('../game').router)

router.use('/files', require('../upload-stream').router)

router.use('/items', require('../item').router)

router.use('/posts', require('../post').router)

router.use('/comments', require('../comment').router)

module.exports = router

