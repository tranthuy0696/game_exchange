const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: String,
    lastest: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    imgUrls: [{
        type: String
    }],
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item'
    },
    viewCount: Number,
    type: String,
    price: Number,
    close: {
      type: Boolean,
      default: false
    }

  })

  module.exports = mongoose.model('post', postSchema, 'posts')
  