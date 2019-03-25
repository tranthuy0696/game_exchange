const fs = require('fs')
const path = require('path')
const { validateToken } = require('../jwt')

const readFile = (filePath) => {
	const content = fs.readFileSync(filePath, 'utf8')
	content = JSON.parse(content)
}

const filterRequest = (req, res, next) => {
	const method = req.method
	const originalUrl = req.originalUrl
	const dataConfig = readFile(path.join(__dirname, 'config.json'))
	const regexUrl = new RegExp('*/(:\w+|\*)*')
	dataConfig = dataConfig.filter((d) => d.method.includes(method))
		.forEach((e) => {
			if (regexUrl.test(e.api)) {
				e.api = e.api.replace(/\*/, '\\w*').replace(/(:\w+)/, "\\w+")
			}
			return e
		})
	const data = dataConfig.find((d) => new RegExp(d.api).test(originalUrl))
	if (data) {
		return validateToken(req.headers.authorization)
			.then((user) => {
				req.user = user
				if (data.role && data.role !== '') {
					return data.role.includes(user.role.toLowerCase()) ? next() : Promise.reject({ message: 'Access denied' })
				}
			})
			.catch((err) => {
				err.code ? res.status(err.code).json(err.message) : res.status(403).json(err.message)
			})
	} else {
		return next()
	}

}