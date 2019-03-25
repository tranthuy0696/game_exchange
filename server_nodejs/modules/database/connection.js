const mongoose = require('mongoose')
const logger = require('../logger')
const db = require('../config').db


mongoose.Promise = global.Promise
mongoose.connect(db.uri, {useMongoClient: true, poolSize: db.poolSize})

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  logger.error('Mongoose default connection error: ', err)
})

process.on('SIGINT', function() {
  mongoose.disconnect()
  process.exit()
})

