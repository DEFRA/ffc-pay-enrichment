const { AHWR, FPTT, WMP } = require('../constants/source-systems')
const { messageConfig } = require('../config')
const isAhwrActive = () => messageConfig.activeSchemes.ahwr
const isFpttActive = () => messageConfig.activeSchemes.fptt
const isWmpActive = () => messageConfig.activeSchemes.wmp

const schemeActiveMap = {
  [AHWR]: isAhwrActive,
  [FPTT]: isFpttActive,
  [WMP]: isWmpActive
}

const isSchemeActive = (sourceSystem) => {
  const check = schemeActiveMap[sourceSystem]
  return check ? check() : true  // unspecified schemes pass through
}

module.exports = { isSchemeActive }
