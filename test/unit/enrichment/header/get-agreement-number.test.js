const { AGREEMENT_NUMBER } = require('../../../mocks/values/agreement-number')
const { CONTRACT_NUMBER } = require('../../../mocks/values/contract-number')

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
})
