const { getSchemeIds } = require('ffc-pay-schemes')

const { FC } = getSchemeIds()

const getAgreementNumber = (paymentRequest) => {
  if (paymentRequest.schemeId === FC) {
    return paymentRequest.invoiceNumber?.split(' ')[0]
  }
  return paymentRequest.agreementNumber ?? paymentRequest.contractNumber
}

module.exports = {
  getAgreementNumber
}
