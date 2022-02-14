const db = require('../data')

const getFundCode = async (schemeId, transaction) => {
  const scheme = await db.scheme.findOne({ where: { schemeId } }, { transaction })
  return scheme?.fundCode
}

module.exports = getFundCode
