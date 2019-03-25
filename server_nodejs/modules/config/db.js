const f = require('util').format

const hasAuthen = process.env.DB_USER && process.env.DB_PWD
const uri = hasAuthen ?
  f('mongodb://%s:%s@%s', process.env.DB_USER, process.env.DB_PWD, process.env.DB_URL)
  : f('mongodb://%s', process.env.DB_URL || 'localhost:27017/game_exchange')

module.exports = {
  db: {
    uri: uri,
    poolSize: process.env.DB_POOL_SIZE || 4,
  },
}
