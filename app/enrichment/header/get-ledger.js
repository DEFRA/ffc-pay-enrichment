const { AP } = require('../../constants/ledgers')

const getLedger = (ledger) => {
  return ledger ?? AP
}

module.exports = {
  getLedger
}
