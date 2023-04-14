const { SCHEME_CODE } = require('../../mocks/values/scheme-code')
const scheme = require('../../mocks/scheme')

jest.mock('../../../app/enrichment/get-scheme-code')
const mockGetSchemeCode = require('../../../app/enrichment/get-scheme-code')

const enrichInvoiceLine = require('../../../app/enrichment/enrich-invoice-line')

let invoiceLine

describe('enrich header', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetSchemeCode.mockResolvedValue(SCHEME_CODE)

    invoiceLine = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/invoice-line')))
  })

  test('should covert value to pence', async () => {
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.value).toBe(25000)
  })

  test('should retain scheme code if already set', async () => {
    const originalSchemeCode = invoiceLine.schemeCode
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.schemeCode).toBe(originalSchemeCode)
  })

  test('should set scheme code if not already set', async () => {
    delete invoiceLine.schemeCode
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.schemeCode).toBe(SCHEME_CODE)
  })

  test('should retain fund code if already set', async () => {
    const originalFundCode = invoiceLine.fundCode
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.fundCode).toBe(originalFundCode)
  })

  test('should set fund code if not already set and fund code defined', async () => {
    delete invoiceLine.fundCode
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.fundCode).toBe(scheme.fundCode)
  })

  test('should not set fund code if not already set and fund code not defined', async () => {
    delete invoiceLine.fundCode
    await enrichInvoiceLine(invoiceLine, undefined)
    expect(invoiceLine.fundCode).toBeUndefined()
  })

  test('should retain convergence if already set', async () => {
    invoiceLine.convergence = true
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.convergence).toBe(true)
  })

  test('should set convergence to false if not already set', async () => {
    delete invoiceLine.convergence
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.convergence).toBe(false)
  })

  test('should retain delivery body if already set', async () => {
    const originalDeliveryBody = invoiceLine.deliveryBody
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.deliveryBody).toBe(originalDeliveryBody)
  })

  test('should set delivery body if not already set and delivery body defined', async () => {
    delete invoiceLine.deliveryBody
    await enrichInvoiceLine(invoiceLine, scheme)
    expect(invoiceLine.deliveryBody).toBe(scheme.deliveryBody)
  })
})
