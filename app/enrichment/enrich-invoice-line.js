const { convertToPence } = require('../currency-convert')
const { getAccountCode } = require('./get-account-code')
const { getFundCode } = require('./get-fund-code')
const { getSchemeCode } = require('./get-scheme-code')
const { isStateAid } = require('./is-state-aid')

const enrichInvoiceLine = (invoiceLine, marketingYear, scheme) => {
  invoiceLine.value = convertToPence(invoiceLine.value)
  invoiceLine.schemeCode = invoiceLine.schemeCode ?? getSchemeCode(invoiceLine)
  invoiceLine.fundCode = invoiceLine.fundCode ?? getFundCode(invoiceLine, scheme?.fundCode)
  invoiceLine.accountCode = invoiceLine.accountCode ?? getAccountCode(invoiceLine)
  invoiceLine.convergence = invoiceLine.convergence ?? false
  invoiceLine.deliveryBody = invoiceLine.deliveryBody ?? scheme?.deliveryBody
  invoiceLine.marketingYear = invoiceLine.marketingYear ?? marketingYear
  invoiceLine.stateAid = isStateAid(invoiceLine, scheme?.schemeId)
}

module.exports = {
  enrichInvoiceLine
}
