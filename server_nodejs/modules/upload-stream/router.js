const express = require('express')
const router = new express.Router()
const handler = require('./handler')
const path = require('path')
const crypto = require('../user/crypto')
const config = require('../config')
const fse = require('fs-extra')

router.get('/:id', (req, res, next) => {
    const params = req.params
    const dir = path.join(global.SERVER_DIR, crypto.decrypt(params.id.replace('$', '\/')))
    const fileContent = fse.readFileSync(dir, 'binary')
    res.write(fileContent, 'binary')
    res.end()
})

module.exports = router
