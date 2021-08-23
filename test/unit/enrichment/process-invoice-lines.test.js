jest.mock('../../../app/enrichment/enrich-invoice-line')
jest.mock('../../../app/enrichment/validate-invoice-line')
const processInvoiceLines = require('../../../app/enrichment/process-invoice-lines')
const validateValues = require('../../../app/enrichment/process-invoice-lines')
const invoiceLine = require('../../../app/enrichment/schemas/invoice-line')

describe('process invoice lines', () => {
  test('should ignore net lines', async () => {
    const lines = [{
      value: 100,
      description: 'G00 - Gross value of claim'
    }, {
      value: 100,
      description: 'N00 - Net value of claim'
    }]
    await processInvoiceLines(lines, 1, 'DRD10')
    expect(lines.length).toBe(1)
  })
})
