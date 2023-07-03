const getAgreementNumber = (paymentRequest) => {
  return paymentRequest.agreementNumber ?? paymentRequest.contractNumber
}

module.exports = {
  getAgreementNumber
}
