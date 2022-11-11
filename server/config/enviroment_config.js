const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/config.js')[env]
module.exports = config
