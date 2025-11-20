const { GBP, EUR } = require('../../../../app/constants/currency')
const { IRREGULAR, ADMINISTRATIVE } = require('../../../../app/constants/debt-types')
const { AP, AR } = require('../../../../app/constants/ledgers')
const { Q4, M12, T4, Y1 } = require('../../../../app/constants/schedules')
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

  test.each([
    'sourceSystem',
    'schemeId',
    'ledger',
    'deliveryBody',
    'invoiceNumber',
    'frn',
    'agreementNumber',
    'currency',
    'dueDate',
    'value',
    'invoiceLines',
    'correlationId'
  ])('should fail validation if %s is missing', (prop) => {
    delete paymentRequest[prop]
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test.each([
    'batch',
    'sbi',
    'marketingYear',
    'schedule',
    'debtType',
    'recoveryDate',
    'contractNumber',
    'pillar',
    'originalInvoiceNumber',
    'originalSettlementDate',
    'invoiceCorrectionReference',
    'paymentType'
  ])('should pass validation if optional %s is missing', (prop) => {
    delete paymentRequest[prop]
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })

  test.each([
    ['schemeId', 'SFI'],
    ['schemeId', -1],
    ['schemeId', 0],
    ['ledger', 'INVALID'],
    ['frn', 'SFI'],
    ['frn', 100],
    ['frn', 10000000000],
    ['sbi', 'SFI'],
    ['sbi', 100],
    ['sbi', 1000000000],
    ['marketingYear', 'SFI'],
    ['marketingYear', 1992],
    ['marketingYear', 2100],
    ['paymentRequestNumber', 'SFI'],
    ['currency', 'USD'],
    ['schedule', 'INVALID'],
    ['dueDate', 'INVALID'],
    ['dueDate', '2019-01-01'], 
    ['value', 'INVALID'],
    ['value', 1.1], 
    ['invoiceLines', 'INVALID'],
    ['debtType', 'INVALID'],
    ['recoveryDate', 'INVALID'],
    ['recoveryDate', '2019-01-01'],
    ['correlationId', 1],
    ['correlationId', 'INVALID'],
    ['paymentType', NaN],
    ['paymentType', null]
  ])('should fail validation if %s is invalid (%p)', (prop, value) => {
    paymentRequest[prop] = value
    expect(schema.validate(paymentRequest).error).toBeDefined()
  })

  test.each([
    ['ledger', AP],
    ['ledger', AR],
    ['currency', GBP],
    ['currency', EUR],
    ['schedule', Q4],
    ['schedule', M12],
    ['schedule', T4],
    ['schedule', Y1],
    ['debtType', IRREGULAR],
    ['debtType', ADMINISTRATIVE],
    ['paymentType', BALANCE],
    ['paymentType', ADVANCE_PAYMENT],
    ['paymentType', undefined],
    ['originalInvoiceNumber', MANUAL_ORIGINAL_INVOICE_NUMBER],
    ['originalInvoiceNumber', undefined],
    ['originalSettlementDate', ORIGINAL_SETTLEMENT_DATE],
    ['originalSettlementDate', undefined],
    ['invoiceCorrectionReference', MANUAL_INVOICE_CORRECTION_REFERENCE],
    ['invoiceCorrectionReference', undefined],
    ['dueDate', DUE_DATE_DAX]
  ])('should pass validation if %s is valid (%p)', (prop, value) => {
    paymentRequest[prop] = value
    expect(schema.validate(paymentRequest).error).toBeUndefined()
  })
})
