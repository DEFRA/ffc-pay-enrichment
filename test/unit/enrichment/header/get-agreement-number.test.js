const { AGREEMENT_NUMBER } = require('../../../mocks/values/agreement-number')
const { CONTRACT_NUMBER } = require('../../../mocks/values/contract-number')
const { FC } = require('../../../../app/constants/schemes')
const { getAgreementNumber } = require('../../../../app/enrichment/header/get-agreement-number')

describe('getAgreementNumber', () => {
  let paymentRequest

  beforeEach(() => {
    paymentRequest = {}
  })

  test('returns existing agreement number if present', () => {
    paymentRequest.agreementNumber = AGREEMENT_NUMBER
    expect(getAgreementNumber(paymentRequest)).toBe(AGREEMENT_NUMBER)
  })

  test('returns contract number if agreement number is missing', () => {
    paymentRequest.contractNumber = CONTRACT_NUMBER
    expect(getAgreementNumber(paymentRequest)).toBe(CONTRACT_NUMBER)
  })

  test('returns undefined if neither agreement nor contract number present', () => {
    expect(getAgreementNumber(paymentRequest)).toBeUndefined()
  })

  describe('when scheme is FC', () => {
    beforeEach(() => {
      paymentRequest.schemeId = FC
    })

    test('returns first segment of invoice number if space exists', () => {
      paymentRequest.invoiceNumber = '1234 56'
      expect(getAgreementNumber(paymentRequest)).toBe('1234')
    })

    test('returns full invoice number if no space segment exists', () => {
      paymentRequest.invoiceNumber = '123456'
      expect(getAgreementNumber(paymentRequest)).toBe('123456')
    })
  })
})
