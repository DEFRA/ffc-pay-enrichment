const { FC } = require('../../constants/schemes')

const getAgreementNumber = (paymentRequest) => {
  if (paymentRequest.schemeId === FC) {
    return paymentRequest.invoiceNumber?.split(' ')[0]
  }
  return paymentRequest.agreementNumber ?? paymentRequest.contractNumber
}

module.exports = {
  getAgreementNumber
}
