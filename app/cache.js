const { cache: config } = require('./config')
const NodeCache = require('node-cache')
const cache = new NodeCache({ useClones: false })

const get = (key) => {
  return cache.get(key)
}

const set = async (key, value) => {
  cache.set(key, value, config.ttl)
}

module.exports = {
  get,
  set
}
