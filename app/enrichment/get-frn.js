const { VENDOR, SBI, TRADER } = require('../constants/reference-types')
const db = require('../data')

const getFrn = async (paymentRequest, transaction) => {
  try {
    if (paymentRequest.frn) {
      return paymentRequest.frn
    }
    const sbi = paymentRequest.sbi
    const vendor = paymentRequest.vendor
    const trader = paymentRequest.trader

    if (!sbi && !vendor && !trader) {
      return undefined
    }

    if (sbi) {
      const customer = await db.customer.findOne({
        where: {
          referenceType: SBI,
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
          referenceType: VENDOR,
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
          referenceType: TRADER,
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
