const invoiceLine = require('./invoice-line')
const { ES_ACCOUNT_CODE } = require('../values/account-code')
const { COMPANY_CODE } = require('../values/company-code')
const { SUB_ACCOUNT_CODE } = require('../values/sub-account-code')

module.exports = {
  ...invoiceLine,
  companyCode: COMPANY_CODE,
  subAccountCode: SUB_ACCOUNT_CODE,
  accountCode: ES_ACCOUNT_CODE
}
