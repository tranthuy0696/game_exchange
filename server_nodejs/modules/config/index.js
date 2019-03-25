
const server = require('./server')
const db = require('./db')

module.exports = Object.assign({}, server, db)
