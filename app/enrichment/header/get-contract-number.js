const { FC } = require('../../constants/schemes')

const getContractNumber = (paymentRequest) => {
  if (paymentRequest.schemeId === FC) {
    return paymentRequest.invoiceNumber.split(' ')[1]
  }
  return paymentRequest.contractNumber
}

module.exports = {
  getContractNumber
}
