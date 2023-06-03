jest.mock('../../../app/enrichment/get-scheme-code')
const { getSchemeCode: mockGetSchemeCode } = require('../../../app/enrichment/get-scheme-code')

jest.mock('../../../app/enrichment/is-state-aid')
const { isStateAid: mockIsStateAid } = require('../../../app/enrichment/is-state-aid')

const scheme = require('../../mocks/scheme')
const { SCHEME_CODE } = require('../../mocks/values/scheme-code')

const { enrichInvoiceLine } = require('../../../app/enrichment/enrich-invoice-line')

const marketingYear = 2023

let invoiceLine

describe('enrich header', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetSchemeCode.mockReturnValue(SCHEME_CODE)
    mockIsStateAid.mockReturnValue(false)

    invoiceLine = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/invoice-line')))
  })

  test('should convert value to pence', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.value).toBe(25000)
  })

  test('should retain scheme code if already set', () => {
    const originalSchemeCode = invoiceLine.schemeCode
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.schemeCode).toBe(originalSchemeCode)
  })

  test('should set scheme code if not already set', () => {
    delete invoiceLine.schemeCode
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.schemeCode).toBe(SCHEME_CODE)
  })

  test('should retain fund code if already set', () => {
    const originalFundCode = invoiceLine.fundCode
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.fundCode).toBe(originalFundCode)
  })

  test('should set fund code if not already set and fund code defined', () => {
    delete invoiceLine.fundCode
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.fundCode).toBe(scheme.fundCode)
  })

  test('should not set fund code if not already set and fund code not defined', () => {
    delete invoiceLine.fundCode
    enrichInvoiceLine(invoiceLine, undefined)
    expect(invoiceLine.fundCode).toBeUndefined()
  })

  test('should retain convergence if already set', () => {
    invoiceLine.convergence = true
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.convergence).toBe(true)
  })

  test('should set convergence to false if not already set', () => {
    delete invoiceLine.convergence
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.convergence).toBe(false)
  })

  test('should retain delivery body if already set', () => {
    const originalDeliveryBody = invoiceLine.deliveryBody
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.deliveryBody).toBe(originalDeliveryBody)
  })

  test('should set delivery body if not already set and delivery body defined', () => {
    delete invoiceLine.deliveryBody
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.deliveryBody).toBe(scheme.deliveryBody)
  })

  test('should retain marketing year if already set', () => {
    const originalMarketingYear = invoiceLine.marketingYear
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.marketingYear).toBe(originalMarketingYear)
  })

  test('should set marketing year if not already set', () => {
    delete invoiceLine.marketingYear
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.marketingYear).toBe(marketingYear)
  })

  test('should check if line is state aid', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockIsStateAid).toHaveBeenCalledWith(invoiceLine)
  })

  test('should set state aid when state aid is false', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.stateAid).toBe(false)
  })

  test('should set state aid when state aid is true', () => {
    mockIsStateAid.mockReturnValue(true)
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.stateAid).toBe(true)
  })
})
