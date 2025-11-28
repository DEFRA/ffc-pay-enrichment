const { getDeliveryBody } = require('../../../../app/enrichment/header/get-delivery-body')
const { FC00 } = require('../../../../app/constants/delivery-bodies')
const { BPS, CS } = require('../../../../app/constants/schemes')
const schemes = require('../../../../app/constants/scheme-properties')

let bpsPaymentRequest
let csPaymentRequest

describe('get header level delivery body', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    bpsPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/bps')))
    csPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/cs')))
  })

  test('returns scheme delivery body for non-CS payment request', () => {
    const scheme = schemes.find(s => s.schemeId === BPS)
    expect(getDeliveryBody(bpsPaymentRequest, scheme)).toBe(scheme.deliveryBody)
  })

  test('returns undefined if no scheme match', () => {
    expect(getDeliveryBody(bpsPaymentRequest, {})).toBeUndefined()
  })

  test('returns scheme delivery body for CS payment request if invoice lines have same delivery body', () => {
    const scheme = schemes.find(s => s.schemeId === CS)
    expect(getDeliveryBody(csPaymentRequest, scheme)).toBe(scheme.deliveryBody)
  })

  test('returns FC00 delivery body for CS payment request if invoice lines do not contain default delivery body', () => {
    const scheme = schemes.find(s => s.schemeId === CS)
    csPaymentRequest.invoiceLines.forEach(line => (line.deliveryBody = FC00))
    expect(getDeliveryBody(csPaymentRequest, scheme)).toBe(FC00)
  })
})
