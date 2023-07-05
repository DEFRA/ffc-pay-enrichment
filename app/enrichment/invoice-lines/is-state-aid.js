const { EXQ00 } = require('../../constants/fund-codes')
const { SOS228, SOS229 } = require('../../constants/account-codes')

const isStateAid = (invoiceLine) => {
  const { fundCode, accountCode } = invoiceLine
  return fundCode === EXQ00 && [SOS228, SOS229].includes(accountCode)
}

module.exports = {
  isStateAid
}
