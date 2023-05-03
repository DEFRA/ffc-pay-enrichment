jest.mock('../../../app/date-convert')
const { convertToDaxDate: mockConvertToDaxDate } = require('../../../app/date-convert')

const { DUE_DATE_DAX } = require('../../mocks/values/due-date')

const { confirmDueDate } = require('../../../app/enrichment/confirm-due-date')

let paymentRequest
let bpsPaymentRequest

describe('confirm due date', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockConvertToDaxDate.mockReturnValue(DUE_DATE_DAX)
    paymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/payment-request')))
    bpsPaymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/bps')))
  })

  test('should convert due date as is if not BPS', () => {
    confirmDueDate(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith(paymentRequest.dueDate)
  })

  test('should convert due date to 1st December of marketing year if BPS', () => {
    confirmDueDate(bpsPaymentRequest.schemeId, bpsPaymentRequest.marketingYear, bpsPaymentRequest.dueDate)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith('2022-12-01')
  })

  test('should return converted due date', () => {
    const dueDate = confirmDueDate(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
    expect(dueDate).toBe(DUE_DATE_DAX)
  })
})
