const Comment = require('./model')
const logger = require('../logger')
const fse = require('fs-extra')
const path = require('path')
const storeFile = require('../upload-stream/handler').storeFile
const crypto = require('../user/crypto')
const Post = require('../post/model')
const role = require('../user/role')

const types = ['sell', 'buy']

const create = (req) => {
	let data = req.body
	if (!data) {
		return Promise.reject(`'data' is required`)
	}
	if (!data.message) {
		return Promise.reject(`'message' is required`)
  }
	if (!req.params.postId) {
		return Promise.reject(`'Post id is required'`)
	} else {
		return Post.findById(id)
		.select('-_version -__v')
		.populate('user', '-password -role')
		.populate('item', '-_version -__v -user')
		.then((post) => {
			return Promise.resolve(post)
		})
			.then((post) => {
				if (!post) {
					return Promise.reject(`Post id '${req.params.postId}' does not exist`)
				}
				const comment = new Comment({
					createAt: new Date().getTime(),
					user: req.user,
					post: post,
					message: data.message
				})
				return comment.save().then((rs) => {
					rs = rs.toObject()
					rs.post = rs.post._id
					return Promise.resolve(rs)
				})
				.catch((err) => {
					return Promise.reject(new Error(`Failed to create comment with error ${err}`))
				})
			})
	}
}

const findCommentList = (req) => {
  let params = {}
  if (req.query) {
		if(req.query.user) {
      params.user = req.query.user
		}
		if(req.query.post) {
      params.post = req.query.post
    }
  }
	return Promise.all([
		Comment.find(params)
			.select('-_version -__v')
			.populate('user', '-password -role')
			.populate('post', '-_version -__v')
			.skip(req.limit * (req.page - 1))
			.limit(req.limit),
		Comment.count()
	])
		.then(([comment, count]) => {
			return Promise.resolve({ results: comment, total: count })
		})
}

const findById = (id) => {
	return Comment.findById(id)
		.select('-_version -__v')
		.populate('user', '-password -role')
		.populate('post', '-_version -__v -user')
		.then((comment) => {
			return Promise.resolve(comment)
		})
}

const findCommentByPost = (req) => {
	return Promise.all([
		Comment.find({ post: req.params.postId })
			.select('-_version -__v')
			.populate('user', '-password -role -_version -__v')
			.populate('post', '-_version -__v -user')
			.skip(req.limit * (req.page - 1))
			.limit(req.limit),
		Comment.count({ post: req.params.postId })
	])
	.then(([posts, count]) => {
		return Promise.resolve({ results: posts, total: count })
	})
}

const deleteComment = (req, id) => {
	return Comment.findById(id)
	.select('-_version -__v')
	.populate('user', '-password')
	.populate({path: 'post', populate: {path: 'user', select: '-_version -__v -password'}})
	.then((comment) => {
		if (!comment) {
			return Promise.reject(`Comment id ${id} does not exist`)
		}
		if (role.isAdmin(req.user) || comment.post.user._id === req.user._id || comment.user._id === req.user._id) {
			return comment.remove()
		}
		else {
			return Promise.reject('You can not permit to delete this comment')
		}
	})
	.catch((err) => Promise.reject(err))
}

const updateComment = (req, id) => {
	return Comment.findById(id)
	.then((comment) => {
		if (!comment) {
			return Promise.reject(`Comment id ${id} does not exist`)
		}
		if (comment.user._id === req.user._id) {
      comment.message = req.body? req.body.message || comment.message : comment.message
			return comment.save()
		}
		else {
			return Promise.reject('You can not permit to edit this comment')
		}
	})
	.catch((err) => Promise.reject(err))
}

module.exports = { create, findById, findCommentList, findCommentByPost, deleteComment, updateComment }
