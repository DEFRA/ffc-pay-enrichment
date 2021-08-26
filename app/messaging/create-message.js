const createMessage = (paymentRequest) => {
  return {
    body: paymentRequest,
    type: 'uk.gov.sfi.payment.enriched',
    source: 'ffc-sfi-payment-enrichment'
  }
}

module.exports = createMessage
