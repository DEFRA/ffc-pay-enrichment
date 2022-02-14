const db = require('../data')

const getSchemeId = async (sourceSystem, transaction) => {
  const scheme = await db.scheme.findOne({ where: { sourceSystem } }, { transaction })
  return scheme?.schemeId
}

module.exports = getSchemeId
