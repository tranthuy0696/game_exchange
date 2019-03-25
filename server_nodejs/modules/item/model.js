const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new mongoose.Schema({
    title: String,
    listings: Number,
    createdAt: String,
    lastest: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    imgUrl: String,
    game: {
        type: Schema.Types.ObjectId,
        ref: 'game'
    }
  })

  module.exports = mongoose.model('item', itemSchema, 'items')
  