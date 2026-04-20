const { AHWR, FPTT } = require('../constants/source-systems')
const { messageConfig } = require('../config')

const schemeActiveMap = {
  [AHWR]: () => messageConfig.activeSchemes.ahwr,
  [FPTT]: () => messageConfig.activeSchemes.fptt,
}

const isSchemeActive = (sourceSystem) => {
  const check = schemeActiveMap[sourceSystem]
  return check ? check() : true  // unspecified schemes pass through
}

module.exports = { isSchemeActive }
