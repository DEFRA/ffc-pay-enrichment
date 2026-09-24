const { getSchemeIds } = require('ffc-pay-schemes')

const { FC } = getSchemeIds()

const getContractNumber = (paymentRequest) => {
  if (paymentRequest.schemeId === FC) {
    return paymentRequest.invoiceNumber?.split(' ')[1] ?? paymentRequest.invoiceNumber
  }
  return paymentRequest.contractNumber
}

module.exports = {
  getContractNumber
}
