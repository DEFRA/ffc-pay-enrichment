const { SOURCE } = require('../../../app/constants/source')
const { ENRICHED } = require('../../../app/messaging/types')
const { FRN } = require('../../mocks/values/frn')

const createMessage = require('../../../app/messaging/create-message')

describe('create message', () => {
  test('sets payment request as body', () => {
    const paymentRequest = {
      frn: FRN
    }
    const message = createMessage(paymentRequest)
    expect(message.body).toEqual(paymentRequest)
  })

  test('sets type', () => {
    const paymentRequest = {
      frn: FRN
    }
    const message = createMessage(paymentRequest, ENRICHED)
    expect(message.type).toEqual(ENRICHED)
  })

  test('sets source', () => {
    const paymentRequest = {
      frn: FRN
    }
    const message = createMessage(paymentRequest)
    expect(message.source).toEqual(SOURCE)
  })
})
