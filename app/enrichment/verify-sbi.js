const { SBI } = require('../constants/reference-types')
const { FC } = require('../constants/schemes')
const db = require('../data')

const verifySBI = async (header, transaction) => {
  if (header.sbi && header.schemeId === FC) {
    const customer = await db.customer.findOne({
      where: {
        referenceType: SBI,
        reference: header.sbi.toString()
      }
    }, { transaction })
    if (!customer) {
      return `Header is invalid, SBI ${header.sbi} does not map to FRN ${header.frn} - expected FRN ${Number(customer.frn)}`
    } else if (header.frn !== Number(customer.frn)) {
      return `Header is invalid, SBI ${header.sbi} does not map to FRN ${header.frn} - no FRN record is held for this SBI`
    }
  }
  return null
}

module.exports = {
  verifySBI
}
