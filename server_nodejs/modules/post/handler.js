const Post = require('./model')
const logger = require('../logger')
const fse = require('fs-extra')
const path = require('path')
const {storeFile, deleteFolder} = require('../upload-stream/handler')
const crypto = require('../user/crypto')
const Item = require('../item/model')
const role = require('../user/role')
const Comment = require('../comment/model')

const types = ['sell', 'buy']

const create = (req) => {
	let data = req.body.data
	if (typeof data === 'string') {
		data = JSON.parse(data)
	}
	if (!data) {
		return Promise.reject(`'data' is required`)
	}
	if (!data.title) {
		return Promise.reject(`'title' is required`)
  }
  if (!data.type) {
    return Promise.reject(`'type' is required`)
  }
  if (!types.includes(data.type.toLowerCase())) {
    return Promise.reject(`Type '${data.type}' does not supported ('sell', 'buy')`)
  }
	if (!req.params.itemId) {
		return Promise.reject(`'Item id is required'`)
	}
	else {
		return Item.findById(req.params.itemId)
		.select('-_version -__v')
		.populate('user', '-password -role')
		.populate('game', '-_version -__v -user')
		.then((item) => {
			return Promise.resolve(item)
		})
			.then((item) => {
				if (!item) {
					return Promise.reject(`Item id '${req.params.itemId}' does not exist`)
				}
				const post = new Post({
					title: data.title,
					createAt: new Date().getTime(),
					listings: 0,
					user: req.user,
          item: item,
          type: data.type,
					viewCount: 0,
					price: data.price
				})
				if (data.lastest) {
					post.lastest = data.lastest
        }
        if (data.description) {
          post.description = data.description
        }
        if (data.price) {
					if (isNaN(Number(data.price))) {
						return Promise.reject(`Price '${data.price}' is invalid`)
					}
          post.price = Number(data.price)
        }
				return post.save().then((rs) => {
					return Promise.resolve(rs)
				})
					.then((rs) => {
						if (req.files) {
							return storeFile(req, 'posts', rs._id.toString())
								.then((fileNames) => {
                  rs.imgUrls = []
									fileNames.image.forEach((e) => {
										rs.imgUrls.push(`/api/files/${crypto.encrypt(e).toString().replace('\/', '$')}`)
									})
									return rs.save()
										.then((result) => {
                      result = result.toObject()
											result.item = result.item._id
											return Promise.resolve(result)
										})
								})
						} else {
              rs = rs.toObject()
              rs.item = rs.item._id
							return Promise.resolve(rs)
						}
					})
					.catch((err) => {
						return Promise.reject(new Error(`Failed to create post with error ${err}`))
					})
			})
	}
}

const findPostList = (req) => {
  let params = {}
  if (req.query) {
    if(req.query.type) {
      params.type = req.query.type
    }
    if(req.query.user) {
      params.user = req.query.user
    }
  }
	return Promise.all([
		Post.find(params)
			.select('-_version -__v')
			.populate('user', '-password -role')
			.populate('item', '-_version -__v -user')
			.skip(req.limit * (req.page - 1))
			.limit(req.limit),
		Post.count(params)
	])
		.then(([posts, count]) => {
			return Promise.resolve({ results: posts, total: count })
		})
}

const findById = (id) => {
	return Post.findById(id)
		.select('-_version -__v')
		.populate('user', '-password -role')
		.populate('item', '-_version -__v -user')
		.then((post) => {
			return Promise.resolve(post)
		})
}

const findPostByItem = (req) => {
	return Promise.all([
		Post.find({ item: req.params.itemId })
			.select('-_version -__v')
			.populate('user', '-password -role -_version -__v')
			.populate('item', '-_version -__v -user')
			.skip(req.limit * (req.page - 1))
			.limit(req.limit),
		Post.count({ item: req.params.itemId })
	])
	.then(([posts, count]) => {
		return Promise.resolve({ results: posts, total: count })
	})
}

const deletePost = (req, id) => {
	return Post.findById(id)
	.select('-_version -__v')
	.populate('user', '-password')
	.then((post) => {
		if (!post) {
			return Promise.reject(`Post id ${id} does not exist`)
		}
		if (role.isMaster(req.user) || post.user._id === req.user._id) {
			return post.remove()
				.then((deleted) => {
					deleteFolder(path.join(global.SERVER_DIR, 'images', 'posts', id))
					return Comment.remove({post: id})
					.then(() => Promise.resolve(deleted))
				})
		}
		else {
			return Promise.reject('You do not have permission to delete this post')
		}
	})
	.catch((err) => Promise.reject(err))
}

const updatePost = (req, id) => {
	return Post.findById(id)
	.select('-_version -__v')
	.populate('user', '-password')
	.then((post) => {
		if (!post) {
			return Promise.reject(`Post id ${id} does not exist`)
		}
		const data = req.body
		if (!data) {
			return Promise.resolve(post)
		}
		if (post.user._id === req.user._id) {
				if (data.type) {
					if (!types.includes(data.type.toLowerCase())) {
						return Promise.reject(`Type '${data.type}' does not supported ('sell', 'buy')`)
					}
				}
				post.type = data.type || post.data
				post.description = data.description || post.description
				post.title = data.title || post.title
				post.close = data.close || post.close
				if (data.price) {
					if (isNaN(Number(data.price))) {
						return Promise.reject(`Price '${data.price}' is invalid`)
					}
          post.price = Number(data.price)
        }
				return post.save()
				.then((rs) => {
					if (req.files) {
						deleteFolder(path.join(global.SERVER_DIR, 'images', 'posts', id))
						return storeFile(req, 'posts', rs._id.toString())
							.then((fileNames) => {
								rs.imgUrls = []
								fileNames.image.forEach((e) => {
									rs.imgUrls.push(`/api/files/${crypto.encrypt(e).toString().replace('\/', '$')}`)
								})
								return rs.save()
									.then((result) => {
										result = result.toObject()
										result.item = result.item._id
										return Promise.resolve(result)
									})
							})
					} else {
						rs = rs.toObject()
						rs.item = rs.item._id
						return Promise.resolve(rs)
					}
				})
		}
		else {
			return Promise.reject('You do not have permission to edit this post')
		}
	})
	.catch((err) => Promise.reject(err))
}

module.exports = { create, findById, findPostList, findPostByItem, deletePost, updatePost }