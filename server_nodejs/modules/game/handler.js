const Game = require('./model')
const logger = require('../logger')
const fse = require('fs-extra')
const path = require('path')
const {storeFile, deleteFolder} = require('../upload-stream/handler')
const crypto = require('../user/crypto')
const role = require('../user/role')
const ItemHandler = require('../item/handler')
const Item = require('../item/model')
const ObjectId = require('mongoose').Types.ObjectId

const create = (req) => {
	let data = req.body.data
	if (typeof data === 'string') {
		data = JSON.parse(data)
	}
	if (!data) {
		return Promise.reject(`'data' is required`)
	}
	if (!data.type) {
		return Promise.reject(`'type' is required`)
	}
	if (!data.title) {
		return Promise.reject(`'title' is required`)
	}
	const game = new Game({
		title: data.title,
		type: data.type,
		createAt: new Date().getTime(),
		listings: 0,
		user: req.user
	})
	if (data.lastest) {
		game.lastest = data.lastest
	}
	return game.save().then((rs) => {
		return Promise.resolve(rs)
	})
		.then((rs) => {
			if (req.files) {
				return storeFile(req, data.type, rs._id.toString())
					.then((fileNames) => {
						rs.imgUrl = fileNames.image && fileNames.image.length > 0 ?
						 `/api/files/${crypto.encrypt(fileNames.image[0]).toString().replace('\/', '$')}`: undefined
						rs.icon = fileNames.icon && fileNames.icon.length > 0 ? 
						`/api/files/${crypto.encrypt(fileNames.icon[0]).toString().replace('\/', '$')}` : undefined
						return rs.save()
						.then((result) => {
							return Promise.resolve(result)
						})
					})
			} else {
				return Promise.resolve(rs)
			}
		})
		.catch((err) => {
			return Promise.reject(new Error(`Failed to create game with error ${err}`))
		})
}

const findGameList = (req) => {
	let filter = {}
	if (req.query) {
		if (req.query.type) {
			filter.type = req.query.type
		}
	}
	return Promise.all([
		Game.find(filter)
			.select('-_version -__v')
			.populate('user', '-password -role')
			.skip(req.limit * (req.page - 1))
			.limit(req.limit),
		Game.count()
	])
		.then(([games, count]) => {
			return Promise.resolve({ results: games, total: count })
		})
}

const findById = (id) => {
	return Game.findById(id)
		.select('-_version -__v')
		.populate('user', '-password -role')
		.then((game) => {
			return Promise.resolve(game)
		})
}

const deleteGame = (req) => {
	const id = req.params.id
	if (!ObjectId.isValid(id)) {
		return Promise.reject(`Game id ${id} does not exist`)
	}
	return Game.findById(id)
	.select('-_version -__v')
	.populate('user', '-password')
	.then((game) => {
		if (!game) {
			return Promise.reject(`Game id ${id} does not exist`)
		}
		if (role.isMaster(req.user)) {
			return game.remove()
				.then((deleted) => {
					deleteFolder(path.join(global.SERVER_DIR, 'images', game.type, id))
					return Item.find({ game: id })
						.then((items) => {
              return Promise.all(items.map((i) => {
								return ItemHandler.deleteItem(req, i._id.toString())
							}))
            })
            .then(() => Promise.resolve(deleted))
				})
		}
		else {
			return Promise.reject({message: 'You do not have permission to delete this game', code: 403})
		}
	})
	.catch((err) => Promise.reject(err))
}

const updateGame = (req, id) => {
	return Game.findById(id)
	.select('-_version -__v')
	.populate('user', '-password')
	.then((game) => {
		if (!game) {
			return Promise.reject(`Game id ${id} does not exist`)
		}
		const data = req.body
		if (!data) {
			return Promise.resolve(game)
		}
		if (game.user._id === req.user._id) {
				game.title = data.title || game.title
        return game.save()
				.then((rs) => {
					if (req.files) {
						deleteFolder(path.join(global.SERVER_DIR, 'images', game.type, id))
						return storeFile(req, data.type, rs._id.toString())
							.then((fileNames) => {
								rs.imgUrl = fileNames.image && fileNames.image.length > 0 ?
								 `/api/files/${crypto.encrypt(fileNames.image[0]).toString().replace('\/', '$')}`: undefined
								rs.icon = fileNames.icon && fileNames.icon.length > 0 ? 
								`/api/files/${crypto.encrypt(fileNames.icon[0]).toString().replace('\/', '$')}` : undefined
								return rs.save()
								.then((result) => {
									return Promise.resolve(result)
								})
							})
					} else {
						return Promise.resolve(rs)
					}
				})
		}
		else {
			return Promise.reject({code: 403, message: 'You do not have permission to edit this game'})
		}
	})
	.catch((err) => Promise.reject(err))
}

module.exports = { create, findById, findGameList, deleteGame, updateGame }
