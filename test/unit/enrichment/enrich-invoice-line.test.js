const { SCHEME_CODE } = require('../../mocks/values/scheme-code')
const { FUND_CODE } = require('../../mocks/values/fund-code')

jest.mock('../../../app/enrichment/get-scheme-code')
const mockGetSchemeCode = require('../../../app/enrichment/get-scheme-code')

const enrichInvoiceLine = require('../../../app/enrichment/enrich-invoice-line')

let fundCode
let invoiceLine

describe('enrich header', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetSchemeCode.mockResolvedValue(SCHEME_CODE)

    fundCode = FUND_CODE
    invoiceLine = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/invoice-line')))
  })

  test('should covert value to pence', async () => {
    await enrichInvoiceLine(invoiceLine, fundCode)
    expect(invoiceLine.value).toBe(25000)
  })

  test('should retain scheme code if already set', async () => {
    const originalSchemeCode = invoiceLine.schemeCode
    await enrichInvoiceLine(invoiceLine, fundCode)
    expect(invoiceLine.schemeCode).toBe(originalSchemeCode)
  })

  test('should set scheme code if not already set', async () => {
    delete invoiceLine.schemeCode
    await enrichInvoiceLine(invoiceLine, fundCode)
    expect(invoiceLine.schemeCode).toBe(SCHEME_CODE)
  })

  test('should retain fund code if already set', async () => {
    const originalFundCode = invoiceLine.fundCode
    await enrichInvoiceLine(invoiceLine, fundCode)
    expect(invoiceLine.fundCode).toBe(originalFundCode)
  })

  test('should set fund code if not already set and fund code defined', async () => {
    delete invoiceLine.fundCode
    await enrichInvoiceLine(invoiceLine, fundCode)
    expect(invoiceLine.fundCode).toBe(fundCode)
  })

  test('should not set fund code if not already set and fund code not defined', async () => {
    delete invoiceLine.fundCode
    await enrichInvoiceLine(invoiceLine, undefined)
    expect(invoiceLine.fundCode).toBeUndefined()
  })
})
