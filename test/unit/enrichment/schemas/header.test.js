const { GBP, EUR } = require('../../../../app/constants/currency')
const { IRREGULAR, ADMINISTRATIVE } = require('../../../../app/constants/debt-types')
const { AP, AR } = require('../../../../app/constants/ledgers')
const { Q4, M12, T4, Y2 } = require('../../../../app/constants/schedules')

const { DUE_DATE_DAX } = require('../../../mocks/values/due-date')
const { BALANCE, ADVANCE_PAYMENT } = require('../../../mocks/values/payment-type')
const { MANUAL_ORIGINAL_INVOICE_NUMBER } = require('../../../mocks/values/original-invoice-number')
const { ORIGINAL_SETTLEMENT_DATE } = require('../../../mocks/values/original-settlement-date')
const { MANUAL_INVOICE_CORRECTION_REFERENCE } = require('../../../mocks/values/invoice-correction-reference')

const schema = require('../../../../app/enrichment/schemas/header')

let paymentRequest

describe('header schema', () => {
  beforeEach(() => {
    paymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/payment-request')))
  })

  test('should pass validation if all properties valid', () => {
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail validation if sourceSystem is missing', () => {
    delete paymentRequest.sourceSystem
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass validation if batch missing', () => {
    delete paymentRequest.batch
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail validation if schemeId is missing', () => {
    delete paymentRequest.schemeId
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if schemeId is not an integer', () => {
    paymentRequest.schemeId = 'SFI'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if schemeId is negative', () => {
    paymentRequest.schemeId = -1
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if schemeId is zero', () => {
    paymentRequest.schemeId = 0
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass validation if ledger is AP', () => {
    paymentRequest.ledger = AP
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass validation if ledger is AR', () => {
    paymentRequest.ledger = AR
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail validation if ledger is missing', () => {
    delete paymentRequest.ledger
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if ledger is not AP or AR', () => {
    paymentRequest.ledger = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if delivery body is missing', () => {
    delete paymentRequest.deliveryBody
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if delivery body is not a valid format', () => {
    paymentRequest.deliveryBody = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if invoice number is missing', () => {
    delete paymentRequest.invoiceNumber
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if frn is missing', () => {
    delete paymentRequest.frn
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if frn is not an integer', () => {
    paymentRequest.frn = 'SFI'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if frn is less than 1000000000', () => {
    paymentRequest.frn = 100
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if frn is greater than 9999999999', () => {
    paymentRequest.frn = 10000000000
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass validation if sbi is missing', () => {
    delete paymentRequest.sbi
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail validation if sbi is not an integer', () => {
    paymentRequest.sbi = 'SFI'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if sbi is less than 105000000', () => {
    paymentRequest.sbi = 100
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if sbi is greater than 999999999', () => {
    paymentRequest.sbi = 1000000000
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass validation if marketing year is missing', () => {
    delete paymentRequest.marketingYear
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass validation if marketing year is 1993', () => {
    paymentRequest.marketingYear = 1993
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail validation if marketing year is not an integer', () => {
    paymentRequest.marketingYear = 'SFI'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if marketing year is less than 1993', () => {
    paymentRequest.marketingYear = 1992
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if marketing year is greater than 2099', () => {
    paymentRequest.marketingYear = 2100
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if payment request number is missing', () => {
    delete paymentRequest.paymentRequestNumber
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail validation if payment request number is not an integer', () => {
    paymentRequest.paymentRequestNumber = 'SFI'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass validation if payment request number is less than 1', () => {
    paymentRequest.paymentRequestNumber = 0
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail if agreement number is missing', () => {
    delete paymentRequest.agreementNumber
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass if contract number is missing', () => {
    delete paymentRequest.contractNumber
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail if currency is missing', () => {
    delete paymentRequest.currency
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass if currency is GBP', () => {
    paymentRequest.currency = GBP
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if currency is EUR', () => {
    paymentRequest.currency = EUR
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail if currency is not GBP or EUR', () => {
    paymentRequest.currency = 'USD'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass if schedule is missing', () => {
    delete paymentRequest.schedule
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if schedule is quarterly', () => {
    paymentRequest.schedule = Q4
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if schedule is monthly', () => {
    paymentRequest.schedule = M12
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if schedule is three day quarterly', () => {
    paymentRequest.schedule = T4
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if schedule is twice yearly (delinked)', () => {
    paymentRequest.schedule = Y2
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail if schedule is not in the expected list', () => {
    paymentRequest.schedule = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if due date is missing', () => {
    delete paymentRequest.dueDate
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if due date is not a date', () => {
    paymentRequest.dueDate = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if due date is not DAX format', () => {
    paymentRequest.dueDate = '2019-01-01'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if value is missing', () => {
    delete paymentRequest.value
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if value is not a number', () => {
    paymentRequest.value = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if value is not an integer', () => {
    paymentRequest.value = 1.1
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if invoice lines missing', () => {
    delete paymentRequest.invoiceLines
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if invoice lines is not an array', () => {
    paymentRequest.invoiceLines = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass if debt type is missing', () => {
    delete paymentRequest.debtType
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if debt type is irregular', () => {
    paymentRequest.debtType = IRREGULAR
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if debt type is administrative', () => {
    paymentRequest.debtType = ADMINISTRATIVE
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail if debt type is not irregular or administrative', () => {
    paymentRequest.debtType = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass if recovery date is missing', () => {
    delete paymentRequest.recoveryDate
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if recovery date is valid', () => {
    paymentRequest.recoveryDate = DUE_DATE_DAX
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail if recovery date is not date', () => {
    paymentRequest.recoveryDate = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if recovery date is not DAX format', () => {
    paymentRequest.recoveryDate = '2019-01-01'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if correlation id is missing', () => {
    delete paymentRequest.correlationId
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if correlation id is not a string', () => {
    paymentRequest.correlationId = 1
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if correlation id is not a valid uuid', () => {
    paymentRequest.correlationId = 'INVALID'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass if paymentType is valid Balance payment', () => {
    paymentRequest.paymentType = BALANCE
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if paymentType is valid Advance payment ', () => {
    paymentRequest.paymentType = ADVANCE_PAYMENT
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if paymentType is undefined ', () => {
    paymentRequest.paymentType = undefined
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should fail if paymentType is a string ', () => {
    paymentRequest.paymentType = 'not a valid payment type'
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if paymentType is NaN ', () => {
    paymentRequest.paymentType = NaN
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should fail if paymentType is null ', () => {
    paymentRequest.paymentType = null
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test('should pass if originalInvoiceNumber is provided', () => {
    paymentRequest.originalInvoiceNumber = MANUAL_ORIGINAL_INVOICE_NUMBER
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if originalInvoiceNumber is undefined', () => {
    paymentRequest.originalInvoiceNumber = undefined
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if originalSettlementDate is provided', () => {
    paymentRequest.originalSettlementDate = ORIGINAL_SETTLEMENT_DATE
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if originalSettlementDate is undefined', () => {
    paymentRequest.originalSettlementDate = undefined
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if invoiceCorrectionReference is provided', () => {
    paymentRequest.invoiceCorrectionReference = MANUAL_INVOICE_CORRECTION_REFERENCE
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if invoiceCorrectionReference is undefined', () => {
    paymentRequest.invoiceCorrectionReference = undefined
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test('should pass if pillar is missing', () => {
    delete paymentRequest.pillar
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })
})
