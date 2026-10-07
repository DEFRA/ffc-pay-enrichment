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
    jest.useFakeTimers({ now: new Date(2024, 5, 15) })
    jest.clearAllMocks()
    mockConvertToDaxDate.mockReturnValue(DUE_DATE_DAX)

    paymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/payment-request')))
    bpsPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/bps')))
    csPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/cs')))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should convert the supplied due date for non-BPS and non-CS schemes', () => {
    confirmDueDate(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)

    expect(mockConvertToDaxDate).toHaveBeenCalledWith(paymentRequest.dueDate)
  })

  test('should use 1 December of the marketing year for a future BPS date', () => {
    bpsPaymentRequest.marketingYear = 2025

    confirmDueDate(
      bpsPaymentRequest.schemeId,
      bpsPaymentRequest.marketingYear,
      bpsPaymentRequest.dueDate
    )

    expect(mockConvertToDaxDate).toHaveBeenCalledWith('2025-12-01')
  })

  test('should use the current date when the BPS date is not in the future', () => {
    bpsPaymentRequest.marketingYear = 2016

    confirmDueDate(
      bpsPaymentRequest.schemeId,
      bpsPaymentRequest.marketingYear,
      bpsPaymentRequest.dueDate
    )

    expect(mockConvertToDaxDate).toHaveBeenCalledWith(
      moment().startOf('day').format(SITI_AGRI_DATE_FORMAT)
    )
  })

  test('should use the current date when a CS date is not in the future', () => {
    csPaymentRequest.dueDate = '2015-01-01'

    confirmDueDate(
      csPaymentRequest.schemeId,
      csPaymentRequest.marketingYear,
      csPaymentRequest.dueDate
    )

    expect(mockConvertToDaxDate).toHaveBeenCalledWith(
      moment().startOf('day').format(SITI_AGRI_DATE_FORMAT)
    )
  })

  test('should preserve a future CS date', () => {
    csPaymentRequest.dueDate = '2024-12-01'

    confirmDueDate(
      csPaymentRequest.schemeId,
      csPaymentRequest.marketingYear,
      csPaymentRequest.dueDate
    )

    expect(mockConvertToDaxDate).toHaveBeenCalledWith(csPaymentRequest.dueDate)
  })

  test('should throw for BPS or CS dates in an invalid format', () => {
    csPaymentRequest.dueDate = '01/01/2023'

    expect(() => confirmDueDate(
      csPaymentRequest.schemeId,
      csPaymentRequest.marketingYear,
      csPaymentRequest.dueDate
    )).toThrow('Invalid due date format provided')

    expect(mockConvertToDaxDate).not.toHaveBeenCalled()
  })

  test('should return the converted due date', () => {
    const dueDate = confirmDueDate(
      paymentRequest.schemeId,
      paymentRequest.marketingYear,
      paymentRequest.dueDate
    )

    expect(dueDate).toBe(DUE_DATE_DAX)
  })
})
