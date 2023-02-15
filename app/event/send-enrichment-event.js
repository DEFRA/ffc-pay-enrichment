const raiseEvent = require('./raise-event')

const sendEnrichmentEvent = async (paymentRequest) => {
  const event = {
    source: 'ffc-pay-enrichment',
    type: 'uk.gov.defra.ffc.pay.payment.enriched',
    data: paymentRequest
  }
  await raiseEvent(event)
}

module.exports = sendEnrichmentEvent
