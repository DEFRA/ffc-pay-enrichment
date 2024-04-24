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
    const scheme = schemes.find(scheme => scheme.schemeId === BPS)
    const result = getDeliveryBody(bpsPaymentRequest, scheme)
    expect(result).toBe(scheme.deliveryBody)
  })

  test('returns undefined if no scheme match', () => {
    const result = getDeliveryBody(bpsPaymentRequest, {})
    expect(result).toBe(undefined)
  })

  test('returns scheme delivery body for CS payment request if invoice lines have same delivery body', () => {
    const scheme = schemes.find(scheme => scheme.schemeId === CS)
    const result = getDeliveryBody(csPaymentRequest, scheme)
    expect(result).toBe(scheme.deliveryBody)
  })

  test('returns FC00 delivery body for CS payment request if invoice lines do not contain default delivery body', () => {
    const scheme = schemes.find(scheme => scheme.schemeId === CS)
    csPaymentRequest.invoiceLines[0].deliveryBody = FC00
    csPaymentRequest.invoiceLines[1].deliveryBody = FC00
    const result = getDeliveryBody(csPaymentRequest, scheme)
    expect(result).toBe(FC00)
  })
})
