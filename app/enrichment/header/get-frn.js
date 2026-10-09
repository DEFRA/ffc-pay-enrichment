const { VENDOR, SBI, TRADER } = require('../../constants/reference-types')
const { customers } = require('../../database')

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
      const customer = (await customers(transaction ?? undefined)
        .where({
          referenceType: SBI,
          reference: sbi.toString()
        })
        .first()) ?? null
      if (customer) {
        return Number(customer.frn)
      }
    }

    if (vendor) {
      const strippedReference = `${vendor.replace('G', '').replace('C', '')}`
      const customer = (await customers(transaction ?? undefined)
        .where('referenceType', VENDOR)
        .where(function () { this.where('reference', vendor).orWhere('reference', strippedReference) })
        .first()) ?? null
      if (customer) {
        return Number(customer.frn)
      }
    }

    if (trader) {
      const strippedReference = `${trader.replace('G', '').replace('C', '')}`
      const customer = (await customers(transaction ?? undefined)
        .where('referenceType', TRADER)
        .where(function () { this.where('reference', trader).orWhere('reference', strippedReference) })
        .first()) ?? null
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
