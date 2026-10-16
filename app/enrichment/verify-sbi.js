const { getSchemeIds } = require('ffc-pay-schemes')
const { SBI } = require('../constants/reference-types')
const { customers } = require('../database')

const { FC } = getSchemeIds()

const verifySBI = async (header, transaction) => {
  if (header.sbi && header.schemeId === FC) {
    const customer = (await customers(transaction ?? undefined)
      .where({
        referenceType: SBI,
        reference: header.sbi.toString()
      })
      .first()) ?? null
    if (!customer) {
      return `Header is invalid, SBI ${header.sbi} does not map to FRN ${header.frn} - no FRN record is held for this SBI`
    } else if (Number(header.frn) !== Number(customer.frn)) {
      return `Header is invalid, SBI ${header.sbi} does not map to FRN ${header.frn} - expected FRN ${Number(customer.frn)}`
    }
  }
  return null
}

module.exports = {
  verifySBI
}
