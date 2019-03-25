const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    message: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
  })

  module.exports = mongoose.model('comment', commentSchema, 'comments')
  