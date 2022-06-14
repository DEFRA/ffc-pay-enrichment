const createMessage = require('../../../app/messaging/create-message')
const { ENRICHED } = require('../../../app/messaging/types')

describe('create message', () => {
  test('sets payment request as body', () => {
    const paymentRequest = {
      frn: 1234567890
    }
    const message = createMessage(paymentRequest)
    expect(message.body).toEqual(paymentRequest)
  })

  test('sets type', () => {
    const paymentRequest = {
      frn: 1234567890
    }
    const message = createMessage(paymentRequest, ENRICHED)
    expect(message.type).toEqual(ENRICHED)
  })

  test('sets source', () => {
    const paymentRequest = {
      frn: 1234567890
    }
    const message = createMessage(paymentRequest)
    expect(message.source).toEqual('ffc-pay-enrichment')
  })
})
