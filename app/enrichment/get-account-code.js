const { ES } = require('../constants/schemes')
const { getAccountCodeFromOregon } = require('./get-account-code-from-oregon')

const getAccountCode = (invoiceLine, schemeId) => {
  if (schemeId === ES) {
    return getAccountCodeFromOregon(invoiceLine)
  }
  return invoiceLine.accountCode
}

module.exports = {
  getAccountCode
}
