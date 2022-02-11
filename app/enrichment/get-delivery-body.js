const db = require('../data')

const getDeliveryBody = async (schemeId, transaction) => {
  const scheme = await db.scheme.findOne({ where: { schemeId } }, { transaction })
  return scheme?.deliveryBody
}

module.exports = getDeliveryBody
