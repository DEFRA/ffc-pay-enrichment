const { getValue } = require('../../../../app/enrichment/header/get-value')

let paymentRequest

describe('get value', () => {
  beforeEach(() => {
    paymentRequest = {}
  })

  test('should convert existing value to pence if value exists', () => {
    paymentRequest.value = 123.45
    const result = getValue(paymentRequest)
    expect(result).toBe(12345)
  })

  test('should convert total invoice values to pence if value does not exist', () => {
    paymentRequest = {
      invoiceLines: [{ value: 123.45 }, { value: 123.45 }]
    }
    const result = getValue(paymentRequest)
    expect(result).toBe(24690)
  })

  test('should convert total invoice values to pence if value is undefined', () => {
    paymentRequest = {
      value: undefined,
      invoiceLines: [{ value: 123.45 }, { value: 123.45 }]
    }
    const result = getValue(paymentRequest)
    expect(result).toBe(24690)
  })

  test('should convert total invoice values to pence if value is null', () => {
    paymentRequest = {
      value: null,
      invoiceLines: [{ value: 123.45 }, { value: 123.45 }]
    }
    const result = getValue(paymentRequest)
    expect(result).toBe(24690)
  })

  test('should return NaN if any invoice lines missing value', () => {
    paymentRequest = {
      invoiceLines: [{ value: 123.45 }, { }]
    }
    const result = getValue(paymentRequest)
    expect(result).toBe(NaN)
  })

  test('should return NaN if any invoice lines have undefined value', () => {
    paymentRequest = {
      invoiceLines: [{ value: 123.45 }, { value: undefined }]
    }
    const result = getValue(paymentRequest)
    expect(result).toBe(NaN)
  })

  test('should return NaN if any invoice lines have null value', () => {
    paymentRequest = {
      invoiceLines: [{ value: 123.45 }, { value: null }]
    }
    const result = getValue(paymentRequest)
    expect(result).toBe(NaN)
  })

  test('should return undefined if payment request does not have value or invoice lines', () => {
    const result = getValue(paymentRequest)
    expect(result).toBeUndefined()
  })
})
