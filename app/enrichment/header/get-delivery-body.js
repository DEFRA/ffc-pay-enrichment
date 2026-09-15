const { getSchemeIds } = require('ffc-pay-schemes')
const { FC00 } = require('../../constants/fc-delivery-bodies')

const { CS } = getSchemeIds()

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
