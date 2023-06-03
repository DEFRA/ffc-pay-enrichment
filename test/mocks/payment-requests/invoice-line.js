const { STANDARD_CODE } = require('../values/standard-code')
const { SCHEME_CODE } = require('../values/scheme-code')
const { ACCOUNT_CODE } = require('../values/account-code')
const { FUND_CODE } = require('../values/fund-code')
const { GROSS_DESCRIPTION } = require('../values/description')
const { DELIVERY_BODY_NATURAL_ENGLAND } = require('../values/delivery-body')
const { AGREEMENT_NUMBER } = require('../values/agreement-number')

module.exports = {
  standardCode: STANDARD_CODE,
  schemeCode: SCHEME_CODE,
  accountCode: ACCOUNT_CODE,
  fundCode: FUND_CODE,
  agreementNumber: AGREEMENT_NUMBER,
  description: GROSS_DESCRIPTION,
  value: 250.00,
  deliveryBody: DELIVERY_BODY_NATURAL_ENGLAND,
  marketingYear: 2023,
  convergence: false,
  stateAid: false
}
