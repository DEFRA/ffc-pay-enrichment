const schemeCodesNonScm = require('./scheme-codes/scheme-codes-non-scm')
const schemeCodesScm13 = require('./scheme-codes/scheme-codes-scm-1-3')
const schemeCodesScm46 = require('./scheme-codes/scheme-codes-scm-4-6')
const schemeCodesScm79 = require('./scheme-codes/scheme-codes-scm-7-9')

module.exports = {
  ...schemeCodesNonScm,
  ...schemeCodesScm13,
  ...schemeCodesScm46,
  ...schemeCodesScm79
}
