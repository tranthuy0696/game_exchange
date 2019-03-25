global.SERVER_DIR = __dirname

const http = require('http')
const express = require('express')

const config = require('./modules/config')
const logger = require('./modules/logger')
const gateway = require('./modules/gateway')
const path = require('path')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const fs = require('fs')
if (process.env.LOG_ENABLED) {
  if (!fs.existsSync(path.join(__dirname, 'logs'))) {
    fs.mkdirSync(path.join(__dirname, 'logs'))
  }
}

if (!fs.existsSync(path.join(__dirname, 'images'))) {
  fs.mkdirSync(path.join(__dirname, 'images'))
}

require('./modules/database')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Last-Modified', (new Date()).toUTCString()) // to avoid 304
  next()
})
app.all('*', (req, res, next) => {
  if (req.query && req.query.page && (Number.isNaN(Number(req.query.page)) || Number(req.query.page) < 0)) {
    res.status(400).json(`'page' ${req.query.page} must be positive number`)
    return
  }
  else if (!req.query || !req.query.page) {
    req.page = 1
  }
  if (req.query && req.query.limit && (Number.isNaN(Number(req.query.limit)) || Number(req.query.limit) < 0)) {
    res.status(400).json(`'limit' ${req.query.limit} must be positive number`)
    return
  }
  else if (!req.query || !req.query.limit) {
    req.limit = 10000
  }
  next()
})
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))
app.use('/api', gateway.web)

app.use((req, res, next) => {
  res.status(404).json({ message: `CANNOT ${req.method} API ${req.originalUrl}` })
})

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({
      message: `Server Error`,
      detail: err.stack
    })
  } else {
    res.status(err.code || 500).json(err)
  }
})

const server = http.createServer(app)
server.listen(config.server.http_port, () => {
  logger.info(`Server is running on port ${config.server.http_port}`)
  console.log('running server on port %d', config.server.http_port)
})
