const mongoose = require('mongoose')
const crypto = require('./crypto')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: true,
  },
  password: String,
  firstName: String,
  lastName: String,
  image: String,
  enabled: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    lowercase: true,
    enum: ['user', 'normal', 'admin'],
    default: 'user',
  }
})

userSchema.pre('save', function(next) {
  let user = this
  if (user.isModified('password') && this.password !== '') {
    this.password = crypto.encrypt(this.password)
  }
  next()
})

module.exports = mongoose.model('user', userSchema, 'users')
