const getDeliveryBody = (invoiceLine, defaultDeliveryBody) => {
  return invoiceLine.deliveryBody ?? defaultDeliveryBody
}

module.exports = {
  getDeliveryBody
}
