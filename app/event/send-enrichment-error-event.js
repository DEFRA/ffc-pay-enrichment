const raiseEvent = require('./raise-event')

const sendEnrichmentErrorEvent = async (paymentRequest, error) => {
  const event = {
    source: 'ffc-pay-enrichment',
    type: 'uk.gov.defra.ffc.pay.payment.rejected',
    data: {
      error: error.message,
      paymentRequest
    }
  }
  await raiseEvent(event)
}

module.exports = sendEnrichmentErrorEvent
