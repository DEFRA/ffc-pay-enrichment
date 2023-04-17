jest.mock('../../../app/enrichment/enrich-invoice-line')
const mockEnrichInvoiceLine = require('../../../app/enrichment/enrich-invoice-line')

jest.mock('../../../app/enrichment/validate-invoice-line')
const mockValidateInvoiceLine = require('../../../app/enrichment/validate-invoice-line')

const { NET_DESCRIPTION, GROSS_DESCRIPTION } = require('../../mocks/values/description')
const { SOURCE_SYSTEM } = require('../../mocks/values/source-system')
const scheme = require('../../mocks/scheme')
const invoiceLine = require('../../mocks/payment-requests/invoice-line')
const invoiceLines = [
  invoiceLine,
  invoiceLine,
  { ...invoiceLine, description: NET_DESCRIPTION }
]

const processInvoiceLines = require('../../../app/enrichment/process-invoice-lines')

describe('process invoice lines', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should ignore net lines', async () => {
    const results = await processInvoiceLines(invoiceLines, SOURCE_SYSTEM, scheme)
    expect(results.length).toBe(2)
    expect(results.every(x => x.description === GROSS_DESCRIPTION)).toBeTruthy()
  })

  test('should enrich each non net line', async () => {
    await processInvoiceLines(invoiceLines, SOURCE_SYSTEM, scheme)
    expect(mockEnrichInvoiceLine).toHaveBeenCalledTimes(2)
    expect(mockEnrichInvoiceLine).toHaveBeenCalledWith(invoiceLines[0], scheme)
  })

  test('should validate each non net line', async () => {
    await processInvoiceLines(invoiceLines, SOURCE_SYSTEM, scheme)
    expect(mockValidateInvoiceLine).toHaveBeenCalledTimes(2)
    expect(mockValidateInvoiceLine).toHaveBeenCalledWith(invoiceLines[0], SOURCE_SYSTEM)
  })
})
