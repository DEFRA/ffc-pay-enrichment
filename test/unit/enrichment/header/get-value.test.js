const { getValue } = require('../../../../app/enrichment/header/get-value')

describe('get value', () => {
  let paymentRequest

  beforeEach(() => {
    paymentRequest = {}
  })

  test('converts existing value to pence if value exists', () => {
    paymentRequest.value = 123.45
    expect(getValue(paymentRequest)).toBe(12345)
  })

  test.each([
    ['undefined value', undefined],
    ['null value', null]
  ])('converts total invoice values to pence if value is %s', (_, val) => {
    paymentRequest.value = val
    paymentRequest.invoiceLines = [{ value: 123.45 }, { value: 123.45 }]
    expect(getValue(paymentRequest)).toBe(24690)
  })

  test.each([
    ['missing value', {}],
    ['undefined value', { value: undefined }],
    ['null value', { value: null }]
  ])('returns NaN if any invoice lines have %s', (_, invalidLine) => {
    paymentRequest.invoiceLines = [{ value: 123.45 }, invalidLine]
    expect(getValue(paymentRequest)).toBe(NaN)
  })

  test('returns undefined if payment request does not have value or invoice lines', () => {
    expect(getValue(paymentRequest)).toBeUndefined()
  })
})
