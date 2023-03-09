const { GBP } = require('../../../app/constants/currency')
const { IRREGULAR } = require('../../../app/constants/debt-types')
const validateHeader = require('../../../app/enrichment/validate-header')
const { AP } = require('../../../app/constants/ledgers')
const { Q4 } = require('../../../app/constants/schedules')

describe('validate header', () => {
  test('does not error if all values present', () => {
    const paymentRequest = {
      correlationId: 'f9721145-e52f-4e8d-be8e-e6c219286a72',
      sourceSystem: 'SFIP',
      schemeId: 1,
      ledger: AP,
      deliveryBody: 'RP00',
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      currency: GBP,
      schedule: Q4,
      dueDate: '12/11/2021',
      debtType: IRREGULAR,
      recoveryDate: '01/03/2021',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).not.toThrow()
  })

  test('does error if source system not present', () => {
    const paymentRequest = {
      schemeId: 1,
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      currency: GBP,
      ledger: AP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if scheme not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      currency: GBP,
      ledger: AP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if marketing year not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      frn: 1111111111,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      currency: GBP,
      ledger: AP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if payment request number not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      currency: GBP,
      ledger: AP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if agreement number not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      contractNumber: 'SFIP123456',
      currency: GBP,
      ledger: AP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if contract number not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      currency: GBP,
      ledger: AP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if currency not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      ledger: AP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if value not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      currency: GBP,
      deliveryBody: 'RP00',
      ledger: AP,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if invoice lines not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      currency: GBP,
      deliveryBody: 'RP00',
      ledger: AP,
      value: 100
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if scheme Id not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      contractNumber: 'SFIP123456',
      agreementNumber: 'SIP00000000001',
      currency: GBP,
      ledger: AP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if delivery body not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      contractNumber: 'SFIP123456',
      agreementNumber: 'SIP00000000001',
      currency: GBP,
      ledger: AP,
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if ledger not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      contractNumber: 'SFIP123456',
      agreementNumber: 'SIP00000000001',
      currency: GBP,
      deliveryBody: 'RP00',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does not error if all optional values present', () => {
    const paymentRequest = {
      correlationId: 'f9721145-e52f-4e8d-be8e-e6c219286a72',
      sourceSystem: 'SFIP',
      schemeId: 1,
      ledger: AP,
      deliveryBody: 'RP00',
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP123456',
      currency: GBP,
      dueDate: '12/11/2021',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).not.toThrow()
  })
})
