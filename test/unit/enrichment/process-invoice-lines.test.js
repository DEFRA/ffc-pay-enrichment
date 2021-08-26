jest.mock('../../../app/enrichment/enrich-invoice-line')
jest.mock('../../../app/enrichment/validate-invoice-line')
const processInvoiceLines = require('../../../app/enrichment/process-invoice-lines')

describe('process invoice lines', () => {
  test('should ignore net lines', async () => {
    const lines = [{
      value: 100,
      description: 'G00 - Gross value of claim'
    }, {
      value: 100,
      description: 'N00 - Net value of claim'
    }]
    const invoiceLines = await processInvoiceLines(lines, 1, 'DRD10')
    expect(invoiceLines.length).toBe(1)
    expect(invoiceLines[0].description).toBe('G00 - Gross value of claim')
  })
})
