const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new mongoose.Schema({
  title: String,
  listings: Number,
  createdAt: String,
  lastest: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  imgUrl: String,
  type: String,
  icon: String
})

module.exports = mongoose.model('game', gameSchema, 'games')
