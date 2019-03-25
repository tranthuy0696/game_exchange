const f = require('util').format
const cryptoJS = require('crypto-js')
const secret = process.env.SECRET || 'This1s4Rand0m'

const hasAuthen = process.env.DB_USER && process.env.DB_PWD
const uri = hasAuthen ?
  f('mongodb://%s:%s@%s', process.env.DB_USER, process.env.DB_PWD, process.env.DB_URL)
  : f('mongodb://%s', process.env.DB_URL || 'localhost:27017/game_exchange')

const mongodb = require('mongodb').MongoClient
mongodb.connect(uri, (err, db) => {
  if (err) {
    console.log(`Cannot connect to server ${uri}`)
    throw err
  }
  console.log(`Connected to server ${uri}`)

  const steps = [
    initUsers,
    initGames,
    initItems,
    initPosts,
    initComments
  ]

  runSequences(db, steps, 0)
})

function runSequences(db, steps, idx) {
  if (idx < steps.length) {
    steps[idx](db).then(() => runSequences(db, steps, idx + 1))
  } else {
    // finish all steps, close database connection
    db.close()
    console.log('Done. Disconnected')
  }
}

function readConfig(name) {
  const fs = require('fs')
  const path = require('path')
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, name), 'utf8'))
  return data
}

function initUsers(db) {
  return new Promise(function (resolve, reject) {
    const users = readConfig('default_users.json').users

    db.collection('users').deleteMany().then(() => {
      console.log('Deleted all user records')
      for (let idx = 0, len = users.length; idx < len; idx++) {
        let user = users[idx]
        user.password = encrypt(user.password ? user.password: user.username).toString()
        db.collection('users').insertOne(user)
        console.log(`Inserted ${user.username} into database`)
      }
      resolve()
    })
  })
}

function encrypt(plainText) {
  return cryptoJS.AES.encrypt(plainText, secret)
}

function initGames(db) {
  return new Promise(function (resolve, reject) {
    db.collection('games').deleteMany().then(() => {
      console.log('Deleted all games records')
      resolve()
    })
  })
}

function initItems(db) {
  return new Promise(function (resolve, reject) {
    db.collection('items').deleteMany().then(() => {
      console.log('Deleted all items records')
      resolve()
    })
  })
}

function initPosts(db) {
  return new Promise(function (resolve, reject) {
    db.collection('posts').deleteMany().then(() => {
      console.log('Deleted all posts records')
      resolve()
    })
  })
}

function initComments(db) {
  return new Promise(function (resolve, reject) {
    db.collection('comments').deleteMany().then(() => {
      console.log('Deleted all comments records')
      resolve()
    })
  })
}
