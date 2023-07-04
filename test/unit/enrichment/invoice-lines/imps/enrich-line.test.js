jest.mock('../../../../../app/enrichment/invoice-lines/imps/get-fund-code')
const { getFundCode: mockGetFundCode } = require('../../../../../app/enrichment/invoice-lines/imps/get-fund-code')

jest.mock('../../../../../app/enrichment/invoice-lines/imps/get-account-code')
const { getAccountCode: mockGetAccountCode } = require('../../../../../app/enrichment/invoice-lines/imps/get-account-code')

const { DOM00 } = require('../../../../../app/constants/fund-codes')
const { SOS210 } = require('../../../../../app/constants/account-codes')

const { enrichInvoiceLine } = require('../../../../../app/enrichment/invoice-lines/imps/enrich-invoice-line')

let invoiceLine

describe('enrich IMPS invoice line', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetFundCode.mockReturnValue(DOM00)
    mockGetAccountCode.mockReturnValue(SOS210)

    invoiceLine = JSON.parse(JSON.stringify(require('../../../../mocks/payment-requests/invoice-line')))
  })

  test('should get IMPS account code', async () => {
    enrichInvoiceLine(invoiceLine)
    expect(mockGetAccountCode).toHaveBeenCalledWith(invoiceLine.standardCode)
  })

  test('should get IMPS fund code', async () => {
    enrichInvoiceLine(invoiceLine)
    expect(mockGetFundCode).toHaveBeenCalledWith(SOS210)
  })
})
