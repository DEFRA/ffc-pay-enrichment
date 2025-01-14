const standardCodesNonScm = require('./standard-codes/standard-codes-non-scm')
const standardCodesScm13 = require('./standard-codes/standard-codes-scm-1-3')
const standardCodesScm46 = require('./standard-codes/standard-codes-scm-4-6')
const standardCodesScm79 = require('./standard-codes/standard-codes-scm-7-9')

module.exports = {
  ...standardCodesNonScm,
  ...standardCodesScm13,
  ...standardCodesScm46,
  ...standardCodesScm79
}
