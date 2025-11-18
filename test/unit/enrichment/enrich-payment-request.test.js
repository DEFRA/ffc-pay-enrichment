const { getScheme } = require('../../../app/enrichment/get-scheme')
const { enrichHeader } = require('../../../app/enrichment/header')
const { validateHeader } = require('../../../app/enrichment/validate-header')
const { enrichInvoiceLines } = require('../../../app/enrichment/invoice-lines')
const { validateValues } = require('../../../app/enrichment/validate-values')
const { enrichPaymentRequest } = require('../../../app/enrichment/enrich-payment-request')

jest.mock('../../../app/enrichment/get-scheme')
jest.mock('../../../app/enrichment/header')
jest.mock('../../../app/enrichment/validate-header')
jest.mock('../../../app/enrichment/invoice-lines')
jest.mock('../../../app/enrichment/validate-values')

describe('enrichPaymentRequest', () => {
  let paymentRequest
  const mockScheme = { schemeId: 1 }

  beforeEach(() => {
    jest.clearAllMocks()

    paymentRequest = {
      schemeId: 1,
      sourceSystem: 'sourceSystem',
      pillar: 'pillar',
      value: 100,
      invoiceLines: [],
      marketingYear: undefined
    }

    getScheme.mockReturnValue(mockScheme)
    enrichHeader.mockImplementation((pr, scheme) => pr)
    validateHeader.mockImplementation(jest.fn())
    enrichInvoiceLines.mockImplementation(
      (invoiceLines, schemeId, marketingYear, scheme) => invoiceLines
    )
    validateValues.mockImplementation(jest.fn())
  })

  test('should call all enrichment and validation functions with correct parameters', async () => {
    await enrichPaymentRequest(paymentRequest)

    expect(getScheme).toHaveBeenCalledWith(
      paymentRequest.schemeId,
      paymentRequest.sourceSystem,
      paymentRequest.pillar
    )
    expect(enrichHeader).toHaveBeenCalledWith(paymentRequest, mockScheme)
    expect(validateHeader).toHaveBeenCalledWith(paymentRequest)
    expect(enrichInvoiceLines).toHaveBeenCalledWith(
      paymentRequest.invoiceLines,
      paymentRequest.schemeId,
      paymentRequest.marketingYear,
      mockScheme
    )
    expect(validateValues).toHaveBeenCalledWith(paymentRequest.value, paymentRequest.invoiceLines)
  })

  describe('error handling', () => {
    const functions = [
      ['getScheme', getScheme, 'Error in getScheme'],
      ['enrichHeader', enrichHeader, 'Error in enrichHeader'],
      ['validateHeader', validateHeader, 'Error in validateHeader'],
      ['enrichInvoiceLines', enrichInvoiceLines, 'Error in enrichInvoiceLines'],
      ['validateValues', validateValues, 'Error in validateValues']
    ]

    test.each(functions)(
      'should throw if %s throws',
      async (_, fn, errorMessage) => {
        fn.mockImplementation(() => { throw new Error(errorMessage) })
        await expect(enrichPaymentRequest(paymentRequest)).rejects.toThrow(errorMessage)
      }
    )
  })
})
