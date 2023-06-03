const { EXQ00 } = require('../../../app/constants/fund-codes')
const { SOS228, SOS229 } = require('../../../app/constants/account-codes')

const { isStateAid } = require('../../../app/enrichment/is-state-aid')

let invoiceLine

describe('is state aid', () => {
  beforeEach(() => {
    invoiceLine = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/invoice-line')))
  })

  test.each([
    [EXQ00, SOS228, true],
    [EXQ00, SOS229, true],
    [EXQ00, 'SOS999', false],
    ['EXQ99', SOS228, false],
    ['EXQ99', SOS229, false],
    ['EXQ99', 'SOS999', false]
  ])('should return %s for fund code %s and account code %s', (fundCode, accountCode, expected) => {
    invoiceLine.fundCode = fundCode
    invoiceLine.accountCode = accountCode
    expect(isStateAid(invoiceLine)).toBe(expected)
  })
})
