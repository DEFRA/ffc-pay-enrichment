const { ACCOUNT_CODE } = require('../../../mocks/values/account-code')
const { FUND_CODE } = require('../../../mocks/values/fund-code')
const { GROSS_DESCRIPTION } = require('../../../mocks/values/description')
const { AGREEMENT_NUMBER } = require('../../../mocks/values/agreement-number')
const { MANUAL, FC, ES, IMPS } = require('../../../../app/constants/schemes')

const schema = require('../../../../app/enrichment/schemas/invoice-line')

let invoiceLine

describe('invoice line schema', () => {
  beforeEach(() => {
    invoiceLine = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/invoice-line')))
    if (!invoiceLine.schemeId) {
      invoiceLine.schemeId = MANUAL
    }
  })

  test('should pass validation if all properties valid', () => {
    expect(schema.validate(invoiceLine).error).toBeUndefined()
  })

  test.each(['standardCode', 'agreementNumber', 'convergence', 'stateAid'])(
    'should pass validation if %s is missing',
    (prop) => {
      delete invoiceLine[prop]
      expect(schema.validate(invoiceLine).error).toBeUndefined()
    }
  )

  test.each(['schemeCode', 'description', 'fundCode', 'value', 'deliveryBody'])(
    'should fail validation if %s is missing',
    (prop) => {
      delete invoiceLine[prop]
      expect(schema.validate(invoiceLine).error).toBeDefined()
    }
  )

  test.each([
    [MANUAL, false],
    [ES, false],
    [FC, false],
    [IMPS, false],
    [0, true]
  ])('accountCode required for scheme %s', (schemeId, validIfMissing) => {
    invoiceLine.schemeId = schemeId
    delete invoiceLine.accountCode
    const error = schema.validate(invoiceLine).error
    validIfMissing ? expect(error).toBeUndefined() : expect(error).toBeDefined()
  })

  test.each([
    ['accountCode', ACCOUNT_CODE, true],
    ['accountCode', '123456789', false],
    ['fundCode', FUND_CODE, true],
    ['fundCode', '123456789', false],
    ['agreementNumber', AGREEMENT_NUMBER, true],
    ['agreementNumber', 1234, false],
    ['description', GROSS_DESCRIPTION, true],
    ['description', 1234, false],
    ['convergence', true, true],
    ['convergence', false, true],
    ['convergence', 'not a boolean', false],
    ['stateAid', true, true],
    ['stateAid', false, true],
    ['stateAid', 'not a boolean', false]
  ])('should validate %s correctly (%p)', (prop, value, shouldPass) => {
    invoiceLine[prop] = value
    const error = schema.validate(invoiceLine).error
    shouldPass ? expect(error).toBeUndefined() : expect(error).toBeDefined()
  })
})
