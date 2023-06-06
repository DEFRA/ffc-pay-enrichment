const { CS } = require('../constants/schemes')
const { EXQ00 } = require('../constants/fund-codes')
const { SOS228, SOS229 } = require('../constants/account-codes')

const isStateAid = (invoiceLine, schemeId) => {
  const { fundCode, accountCode } = invoiceLine
  return schemeId === CS && fundCode === EXQ00 && [SOS228, SOS229].includes(accountCode)
}

module.exports = {
  isStateAid
}
