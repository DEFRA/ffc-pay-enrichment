const { cache: config } = require('./config')
const NodeCache = require('node-cache')
const cache = new NodeCache({ useClones: false })

const get = (key) => {
  return cache.get(key)
}

const set = (key, value) => {
  cache.set(key, value, config.ttl)
}

const flush = () => {
  cache.flushAll()
}

module.exports = {
  get,
  set,
  flush
}
