module.exports = {
    server: {
      http_port: process.env.PORT || 8080,
      https_port: process.env.HTTPS_PORT || 443,
      secret: process.env.SECRET || 'This1s4Rand0m', // use to encrypt user password
      algorithm: 'aes192',
      jwt: {
        secret: 'S3cr3t4JwtG3n3r4t10n',
        algorithm: 'HS256',
        expiresInMinutes: 30, // minutes
      },
      log: {
        dir: 'logs',
        filename: process.env.GAME_EXCHANGE_LOG_FILE_NAME || 'events.log',
        size: process.env.GAME_EXCHANGE_LOG_LOG_FILE_SIZE || 10485760,
        level: process.env.GAME_EXCHANGE_LOG_LOG_LEVEL || 'debug' // trace > debug > info > warn > error > fatal
      }
    },
  }
  
  
  