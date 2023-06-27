const db = require('../data')

const getFrn = async (paymentRequest, transaction) => {
  try {
    const sbi = paymentRequest.sbi
    const vendor = paymentRequest.vendor
    const trader = paymentRequest.trader

    if (!sbi && !vendor && !trader) {
      return undefined
    }

    if (sbi) {
      const customer = await db.customer.findOne({
        where: {
          referenceType: 'sbi',
          reference: sbi.toString()
        }
      }, { transaction })
      if (customer) {
        return Number(customer.frn)
      }
    }

    if (vendor) {
      const customer = await db.customer.findOne({
        where: {
          referenceType: 'vendor',
          [db.Sequelize.Op.or]: [{ reference: vendor }, { reference: `${vendor.replace('G', '').replace('C', '')}` }]
        }
      }, { transaction })
      if (customer) {
        return Number(customer.frn)
      }
    }

    if (trader) {
      const customer = await db.customer.findOne({
        where: {
          referenceType: 'trader',
          [db.Sequelize.Op.or]: [{ reference: trader }, { reference: `${trader.replace('G', '').replace('C', '')}` }]
        }
      }, { transaction })
      if (customer) {
        return Number(customer.frn)
      }
    }
    return undefined
  } catch {
    return undefined
  }
}

module.exports = {
  getFrn
}
