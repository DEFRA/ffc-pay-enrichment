const createMessage = (paymentRequest) => {
  return {
    body: paymentRequest,
    type: 'uk.gov.sfi.payment.enriched',
    source: 'ffc-pay-enrichment'
  }
}

module.exports = createMessage
