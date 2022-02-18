const db = require('../data')

const getScheme = async (sourceSystem) => {
  return db.scheme.findOne({ where: { sourceSystem } })
}

module.exports = getScheme
