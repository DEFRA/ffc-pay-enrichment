const { RP00, NE00 } = require('../../../../app/constants/delivery-bodies')

const { getDeliveryBody } = require('../../../../app/enrichment/invoice-lines/get-delivery-body')

describe('get delivery body', () => {
  test('should return delivery body if delivery body already exists', () => {
    const invoiceLine = { deliveryBody: NE00 }
    const result = getDeliveryBody(invoiceLine, RP00)
    expect(result).toBe(NE00)
  })

  test('should return default delivery body if no existing delivery body', () => {
    const invoiceLine = {}
    const result = getDeliveryBody(invoiceLine, RP00)
    expect(result).toBe(RP00)
  })
})
