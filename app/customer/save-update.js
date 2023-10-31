const db = require('../data')
const { TRADER, VENDOR, SBI } = require('../constants/reference-types')

const saveUpdate = async (customerUpdate) => {
  for (const referenceType in customerUpdate) {
    if ([TRADER, VENDOR, SBI].includes(referenceType)) {
      const existingCustomer = await db.customer.findOne({ where: { referenceType, reference: customerUpdate[referenceType].toString() } })
      if (existingCustomer) {
        await db.customer.update({ frn: customerUpdate.frn }, { where: { id: existingCustomer.id } })
      } else {
        await db.customer.create({ referenceType, reference: customerUpdate[referenceType], frn: customerUpdate.frn })
      }
    }
  }
}

module.exports = {
  saveUpdate
}
