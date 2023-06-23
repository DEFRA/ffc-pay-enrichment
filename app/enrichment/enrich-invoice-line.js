const { convertToPence } = require('../currency-convert')
const { getAccountCode } = require('./get-account-code')
const { getDeliveryBody } = require('./get-delivery-body')
const { getFundCode } = require('./get-fund-code')
const { getSchemeCode } = require('./get-scheme-code')
const { isStateAid } = require('./is-state-aid')

const enrichInvoiceLine = (invoiceLine, marketingYear, scheme) => {
  invoiceLine.value = convertToPence(invoiceLine.value)
  invoiceLine.schemeCode = getSchemeCode(invoiceLine)
  invoiceLine.fundCode = getFundCode(invoiceLine, scheme?.fundCode)
  invoiceLine.accountCode = getAccountCode(invoiceLine)
  invoiceLine.convergence = invoiceLine.convergence ?? false
  invoiceLine.deliveryBody = getDeliveryBody(invoiceLine, scheme?.deliveryBody)
  invoiceLine.marketingYear = invoiceLine.marketingYear ?? marketingYear
  invoiceLine.stateAid = isStateAid(invoiceLine, scheme?.schemeId)
}

module.exports = {
  enrichInvoiceLine
}
