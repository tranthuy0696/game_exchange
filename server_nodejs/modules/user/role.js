const level = {
    master: 0,
    normal: 1,
    user: 2,
  }
  
  module.exports.isMaster = (user) => {
    return level[user.role] === 0
  }
  
  module.exports.isNormalAdmin = (user) => {
    return level[user.role] === 1
  }
  
  module.exports.isAdmin = (user) => {
    return level[user.role] < 2
  }
  