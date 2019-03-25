const cryptoJS = require('crypto-js')
const config = require('../config')

/**
 * encrypt text
 *
 * @param {String} plainText
 * @return {*|CipherParams}
 */
module.exports.encrypt = function(plainText) {
  return cryptoJS.AES.encrypt(plainText, config.server.secret)
}

module.exports.decrypt = function(encryptText) {
  let bytes = cryptoJS.AES.decrypt(encryptText.toString(),
  config.server.secret)
  return bytes.toString(cryptoJS.enc.Utf8)
}
/**
 * check whether a plain text matches the encrypted text
 *
 * @param {String} plainText the plain text
 * @param {String} encryptText the encrypt text
 * @return {boolean}
 */
module.exports.matches = function matches(plainText, encryptText) {
  let bytes = cryptoJS.AES.decrypt(encryptText.toString(),
    config.server.secret)
  return bytes.toString(cryptoJS.enc.Utf8) === plainText
}
