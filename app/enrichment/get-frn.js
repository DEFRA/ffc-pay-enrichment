const db = require('../data')

const getFrn = async (paymentRequest, transaction) => {
  try {
    const sbi = paymentRequest.sbi ?? null
    const vendor = paymentRequest.vendor ?? null
    const frn = await db.frn.findOne({
      where: {
        [db.Sequelize.Op.or]: [{
          [db.Sequelize.Op.and]: [{ sbi }, { [db.Sequelize.Op.not]: [{ sbi: null }] }]
        }, {
          [db.Sequelize.Op.and]: [{ vendor }, { [db.Sequelize.Op.not]: [{ vendor: null }] }]
        }]
      }
    }, { transaction })
    return frn ? Number(frn.frn) : undefined
  } catch {
    return undefined
  }
}

module.exports = {
  getFrn
}
