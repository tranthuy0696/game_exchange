const express = require('express')
const router = new express.Router()
const getToken = require('../jwt').getToken

router.post('/login', getToken)

module.exports = router
