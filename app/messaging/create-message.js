const createMessage = (paymentRequest) => {
  return {
    body: paymentRequest,
    type: 'uk.gov.pay.enriched',
    source: 'ffc-pay-enrichment'
  }
}

module.exports = createMessage
