const Item = require('./model')
const logger = require('../logger')
const fse = require('fs-extra')
const path = require('path')
const {storeFile, deleteFolder} = require('../upload-stream/handler')
const crypto = require('../user/crypto')
const Game = require('../game/model')
const Post = require('../post/model')
const role = require('../user/role')
const PostHandler = require('../post/handler')

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
	if (!req.params.gameId) {
		return Promise.reject(`'Game id is required'`)
	} else {
		return Game.findById(req.params.gameId)
		.select('-_version -__v')
		.populate('user', '-password -role')
		.then((game) => {
			return Promise.resolve(game)
		})
			.then((game) => {
				if (!game) {
					return Promise.reject(`Game id '${req.params.gameId}' does not exist`)
				}
				const item = new Item({
					title: data.title,
					createAt: new Date().getTime(),
					listings: 0,
					user: req.user,
					game: game
				})
				if (data.lastest) {
					item.lastest = data.lastest
				}
				return item.save().then((rs) => {
					return Promise.resolve(rs)
				})
					.then((rs) => {
						if (req.files) {
							return storeFile(req, 'items', rs._id.toString())
								.then((fileNames) => {
									rs.imgUrl = fileNames.image && fileNames.image.length > 0 ?
										`/api/files/${crypto.encrypt(fileNames.image[0]).toString().replace('\/', '$')}` : undefined
									return rs.save()
										.then((result) => {
											result = result.toObject()
											result.game = result.game._id
											return Promise.resolve(result)
										})
								})
						} else {
							rs = rs.toObject()
							rs.game = rs.game._id
							return Promise.resolve(rs)
						}
					})
					.catch((err) => {
						return Promise.reject(new Error(`Failed to create game with error ${err}`))
					})
			})
	}
}

const findItemList = (req) => {
	let params = {}
	return Promise.all([
		Item.find()
			.select('-_version -__v')
			.populate('user', '-password -role')
			.populate('game', '-_version -__v -user')
			.skip(req.limit * (req.page - 1))
			.limit(req.limit),
		Item.count()
	])
		.then(([items, count]) => {
			return Promise.resolve({ results: items, total: count })
		})
}

const findById = (id) => {
	return Item.findById(id)
		.select('-_version -__v')
		.populate('user', '-password -role')
		.populate('game', '-_version -__v -user')
		.then((item) => {
			return Promise.resolve(item)
		})
}

const findItemByGame = (req) => {
	return Promise.all([
		Item.find({ game: req.params.gameId })
			.select('-_version -__v')
			.populate('user', '-password -role -_version -__v')
			.populate('game', '-_version -__v -user')
			.skip(req.limit * (req.page - 1))
			.limit(req.limit),
		Item.count({ game: req.params.gameId })
	])
	.then(([items, count]) => {
		return Promise.resolve({ results: items, total: count })
	})
}

const deleteItem = (req, id) => {
	return Item.findById(id)
	.select('-_version -__v')
	.populate('user', '-password')
	.then((item) => {
		if (!item) {
			return Promise.reject(`Item id ${id} does not exist`)
		}
		if (item.user._id === req.user._id || role.isMaster(req.user)) {
			return item.remove()
				.then((deleted) => {
					deleteFolder(path.join(global.SERVER_DIR, 'images', 'items', id))
					return Post.find({ item: id }).exec()
						.then((posts) => {
              posts.forEach((post) => deleteFolder(post._id.toString()))
              return Promise.all(posts.map((p) => {
                return PostHandler.deletePost(req, p._id.toString())
              }))
            })
            .then(() => Promise.resolve(deleted))
				})
		}
		else {
			return Promise.reject('You do not have permission to delete this item')
		}
	})
	.catch((err) => Promise.reject(new Error(err)))
}

const updateItem = (req, id) => {
	return Item.findById(id)
	.select('-_version -__v')
	.populate('user', '-password')
	.then((item) => {
		if (!item) {
			return Promise.reject(`Item id ${id} does not exist`)
		}
		const data = req.body
		if (!data) {
			return Promise.resolve(item)
		}
		if (item.user._id === req.user._id) {
				item.title = data.title || item.title
        return item.save()
        .then((rs) => {
          if (req.files) {
            deleteFolder(path.join(global.SERVER_DIR, 'images', 'items', id))
            return storeFile(req, 'items', rs._id.toString())
              .then((fileNames) => {
                rs.imgUrl = fileNames.image && fileNames.image.length > 0 ?
                  `/api/files/${crypto.encrypt(fileNames.image[0]).toString().replace('\/', '$')}` : undefined
                return rs.save()
                  .then((result) => {
                    result = result.toObject()
                    result.game = result.game._id
                    return Promise.resolve(result)
                  })
              })
          } else {
            rs = rs.toObject()
            rs.game = rs.game._id
            return Promise.resolve(rs)
          }
        })
		}
		else {
			return Promise.reject('You do not have permission to edit this item')
		}
	})
	.catch((err) => Promise.reject(err))
}

module.exports = { create, findById, findItemList, findItemByGame, deleteItem, updateItem }