const fs = require('fs-extra')
const path = require('path')

const storeFile = (req, type, id) => {
	const firstKey = Object.keys(req.files)[0]
	const secondKey = Object.keys(req.files)[1]
	let result = {}
	if (firstKey && (firstKey === 'image' || firstKey === 'icon')) {
		result[firstKey] = storeImageByType(req, type, firstKey, id)
	}
	if (secondKey && (secondKey === 'image' || secondKey === 'icon')) {
		result[secondKey] = storeImageByType(req, type, secondKey, id)
	}
	return Promise.resolve(result)
}

const storeImageByType = (req, type, key, id) => {
	const dir = path.join(global.SERVER_DIR, 'images', type, id, key)
	if (!fs.existsSync(dir)) {
		fs.mkdirpSync(dir)
	}
	const listFile = Array.isArray(req.files[key]) ? req.files[key] : [req.files[key]]
	let fileNames = []
	listFile.forEach((e) => {
		fs.writeFileSync(path.join(dir, e.name), e.data)
		fileNames.push(path.join('images', type, id, key, e.name))
	})
	return fileNames
}

const stream = (req, res, path, contentType) => {
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = req.headers.range
	if (range) {
		const parts = range.replace(/bytes=/, '').split('-')
		const start = parseInt(parts[0], 10)
		const end = parts[1]
			? parseInt(parts[1], 10)
			: fileSize-1
		const chunksize = (end-start)+1
		const file = fs.createReadStream(path, {start, end})
		const head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': contentType,
		}
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': contentType,
		}
		res.writeHead(200, head)
		fs.createReadStream(path).pipe(res)
	}
}

const deleteFolder = (path) => {
	if (!fs.existsSync(path)) {
		return Promise.reject(`File or directory '${path}' does not exist`)
	}
	fs.removeSync(path)
}

module.exports = { storeFile, stream, deleteFolder}
