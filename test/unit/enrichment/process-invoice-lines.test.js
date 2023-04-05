const { FUND_CODE } = require('../../mocks/values/fund-code')
const { NET_DESCRIPTION, GROSS_DESCRIPTION } = require('../../mocks/values/description')
const { SOURCE_SYSTEM } = require('../../mocks/values/source-system')

jest.mock('../../../app/enrichment/enrich-invoice-line')
const mockEnrichInvoiceLine = require('../../../app/enrichment/enrich-invoice-line')

jest.mock('../../../app/enrichment/validate-invoice-line')
const mockValidateInvoiceLine = require('../../../app/enrichment/validate-invoice-line')

const processInvoiceLines = require('../../../app/enrichment/process-invoice-lines')

const invoiceLine = require('../../mocks/payment-requests/invoice-line')
const invoiceLines = [
  invoiceLine,
  invoiceLine,
  { ...invoiceLine, description: NET_DESCRIPTION }
]

describe('process invoice lines', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should ignore net lines', async () => {
    const results = await processInvoiceLines(invoiceLines, FUND_CODE, SOURCE_SYSTEM)
    expect(results.length).toBe(2)
    expect(results.every(x => x.description === GROSS_DESCRIPTION)).toBeTruthy()
  })

  test('should enrich each non net line', async () => {
    await processInvoiceLines(invoiceLines, FUND_CODE, SOURCE_SYSTEM)
    expect(mockEnrichInvoiceLine).toHaveBeenCalledTimes(2)
    expect(mockEnrichInvoiceLine).toHaveBeenCalledWith(invoiceLines[0], FUND_CODE)
  })

  test('should validate each non net line', async () => {
    await processInvoiceLines(invoiceLines, FUND_CODE, SOURCE_SYSTEM)
    expect(mockValidateInvoiceLine).toHaveBeenCalledTimes(2)
    expect(mockValidateInvoiceLine).toHaveBeenCalledWith(invoiceLines[0], SOURCE_SYSTEM)
  })
})
