const validateInvoiceLine = require('../../../app/enrichment/validate-invoice-line')

describe('validate invoice line', () => {
  test('does not error if all values present', () => {
    const line = {
      standardCode: '80001',
      schemeCode: '80001',
      accountCode: 'SOS273',
      fundCode: 'DRD10',
      description: 'G00 - Gross value of claim',
      value: 100
    }
    expect(() => validateInvoiceLine(line)).not.toThrow()
  })

  test('does not error if all optional values not present', () => {
    const line = {
      schemeCode: '80001',
      fundCode: 'DRD10',
      description: 'G00 - Gross value of claim',
      value: 100
    }
    expect(() => validateInvoiceLine(line)).not.toThrow()
  })

  test('does error if scheme code not present', () => {
    const line = {
      fundCode: 'DRD10',
      description: 'G00 - Gross value of claim',
      value: 100
    }
    expect(() => validateInvoiceLine(line)).toThrow()
  })

  test('does error if fund code not present', () => {
    const line = {
      schemeCode: '80001',
      description: 'G00 - Gross value of claim',
      value: 100
    }
    expect(() => validateInvoiceLine(line)).toThrow()
  })

  test('does error if description not present', () => {
    const line = {
      schemeCode: '80001',
      fundCode: 'DRD10',
      value: 100
    }
    expect(() => validateInvoiceLine(line)).toThrow()
  })

  test('does error if value not present', () => {
    const line = {
      schemeCode: '80001',
      fundCode: 'DRD10',
      description: 'G00 - Gross value of claim'
    }
    expect(() => validateInvoiceLine(line)).toThrow()
  })
})
