const { RP00, NE00 } = require('../../../../app/constants/delivery-bodies')
const { getDeliveryBody } = require('../../../../app/enrichment/invoice-lines/get-delivery-body')

describe('get delivery body', () => {
  test.each([
    [{ deliveryBody: NE00 }, RP00, NE00],
    [{}, RP00, RP00]
  ])('returns correct delivery body for invoiceLine %o with default %s', (invoiceLine, defaultBody, expected) => {
    expect(getDeliveryBody(invoiceLine, defaultBody)).toBe(expected)
  })
})
