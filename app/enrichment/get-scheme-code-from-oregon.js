const oregonSchemeCodeMap = require('../constants/oregon-scheme-code-map')

const getSchemeCodeFromOregon = (oregonSchemeCode) => {
  return oregonSchemeCodeMap[oregonSchemeCode] ?? oregonSchemeCode
}

module.exports = {
  getSchemeCodeFromOregon
}
