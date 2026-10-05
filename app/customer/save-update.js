const { customers } = require('../database')
const { TRADER, VENDOR, SBI } = require('../constants/reference-types')

const saveUpdate = async (customerUpdate) => {
  for (const referenceType of Object.keys(customerUpdate)) {
    await saveReference(customerUpdate, referenceType) // NOSONAR
  }
}

const saveReference = async (customerUpdate, referenceType) => {
  if ([TRADER, VENDOR, SBI].includes(referenceType)) {
    const existingCustomer = (await customers().where({ referenceType, reference: customerUpdate[referenceType].toString() }).first()) ?? null
    if (existingCustomer) {
      await customers().where({ id: existingCustomer.id }).update({ frn: customerUpdate.frn })
    } else {
      await customers().insert({ referenceType, reference: customerUpdate[referenceType], frn: customerUpdate.frn })
    }
  }
}

module.exports = {
  saveUpdate
}
