const moment = require('moment')

jest.mock('../../../../app/date-convert')
const { convertToDaxDate: mockConvertToDaxDate } = require('../../../../app/date-convert')

const { DUE_DATE_DAX } = require('../../../mocks/values/due-date')

const { confirmDueDate } = require('../../../../app/enrichment/header/confirm-due-date')
const { SITI_AGRI_DATE_FORMAT } = require('../../../../app/constants/date-formats')

let paymentRequest
let bpsPaymentRequest
let csPaymentRequest

describe('confirm due date', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockConvertToDaxDate.mockReturnValue(DUE_DATE_DAX)
    paymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/payment-request')))
    bpsPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/bps')))
    csPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/cs')))
  })

  test('should convert due date as is if not BPS OR CS', () => {
    confirmDueDate(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith(paymentRequest.dueDate)
  })

  test('should convert due date to 1st December of marketing year if BPS, provided this is in the future', () => {
    bpsPaymentRequest.marketingYear = moment().startOf('day').add(1, 'year').year()
    confirmDueDate(bpsPaymentRequest.schemeId, bpsPaymentRequest.marketingYear, bpsPaymentRequest.dueDate)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith(`${bpsPaymentRequest.marketingYear}-12-01`)
  })

  test('should convert due date to current date if 1st December date is not in future for BPS', () => {
    bpsPaymentRequest.marketingYear = '2016'
    confirmDueDate(bpsPaymentRequest.schemeId, bpsPaymentRequest.marketingYear, bpsPaymentRequest.dueDate)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith(moment().startOf('day').format(SITI_AGRI_DATE_FORMAT))
  })

  test('should convert due date to current date if date is not in future for CS', () => {
    csPaymentRequest.dueDate = '2015-01-01'
    confirmDueDate(csPaymentRequest.schemeId, csPaymentRequest.marketingYear, csPaymentRequest.dueDate)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith(moment().startOf('day').format(SITI_AGRI_DATE_FORMAT))
  })

  test('should throw error for BPS/CS if date is in unexpected bad format', () => {
    csPaymentRequest.dueDate = '01/01/2023'
    const confirmDueDateWrapper = () => confirmDueDate(csPaymentRequest.schemeId, csPaymentRequest.marketingYear, csPaymentRequest.dueDate)
    expect(confirmDueDateWrapper).toThrow()
    expect(mockConvertToDaxDate).not.toHaveBeenCalled()
  })

  test('should return converted due date', () => {
    const dueDate = confirmDueDate(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
    expect(dueDate).toBe(DUE_DATE_DAX)
  })
})
