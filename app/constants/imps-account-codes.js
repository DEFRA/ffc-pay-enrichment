const impsAccountCodesNonScm = require('./imps-account-codes/imps-account-codes-non-scm')
const impsAccountCodesScm13 = require('./imps-account-codes/imps-account-codes-scm-1-3')
const impsAccountCodesScm46 = require('./imps-account-codes/imps-account-codes-scm-4-6')
const impsAccountCodesScm79 = require('./imps-account-codes/imps-account-codes-scm-7-9')

module.exports = {
  ...impsAccountCodesNonScm,
  ...impsAccountCodesScm13,
  ...impsAccountCodesScm46,
  ...impsAccountCodesScm79
}
