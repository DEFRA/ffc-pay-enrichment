const { FC00 } = require('../../constants/delivery-bodies')
const { CS } = require('../../constants/schemes')

const getDeliveryBody = (paymentRequest, scheme) => {
  if (paymentRequest.schemeId === CS) {
    const defaultDeliveryBody = scheme?.deliveryBody
    return paymentRequest.invoiceLines.some(line => line.deliveryBody === defaultDeliveryBody) ? defaultDeliveryBody : FC00
  }
  return scheme?.deliveryBody
}

module.exports = {
  getDeliveryBody
}
