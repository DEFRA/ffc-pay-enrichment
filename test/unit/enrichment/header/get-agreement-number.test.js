const { AGREEMENT_NUMBER } = require('../../../mocks/values/agreement-number')
const { CONTRACT_NUMBER } = require('../../../mocks/values/contract-number')

const { FC } = require('../../../../app/constants/schemes')

const { getAgreementNumber } = require('../../../../app/enrichment/header/get-agreement-number')

let paymentRequest

describe('get agreement number', () => {
  beforeEach(() => {
    paymentRequest = {}
  })

  test('should return agreement number if payment request already has agreement number', () => {
    paymentRequest.agreementNumber = AGREEMENT_NUMBER
    const result = getAgreementNumber(paymentRequest)
    expect(result).toBe(AGREEMENT_NUMBER)
  })

  test('should return contract number if payment request does not have agreement number but has contract number', () => {
    paymentRequest.contractNumber = CONTRACT_NUMBER
    const result = getAgreementNumber(paymentRequest)
    expect(result).toBe(CONTRACT_NUMBER)
  })

  test('should return undefined if payment request does not have agreement number or contract number', () => {
    const result = getAgreementNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('should return first segment of invoice number if FC', () => {
    paymentRequest.invoiceNumber = '1234 56'
    paymentRequest.schemeId = FC
    const result = getAgreementNumber(paymentRequest)
    expect(result).toBe('1234')
  })

  test('should return full invoice number if FC and no first segment', () => {
    paymentRequest.invoiceNumber = '123456'
    paymentRequest.schemeId = FC
    const result = getAgreementNumber(paymentRequest)
    expect(result).toBe(paymentRequest.invoiceNumber)
  })
})
