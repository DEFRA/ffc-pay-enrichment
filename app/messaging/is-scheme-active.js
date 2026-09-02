const { getSourceSystems } = require('ffc-pay-schemes')
const { messageConfig } = require('../config')
const isAhwrActive = () => messageConfig.activeSchemes.ahwr
const isFpttActive = () => messageConfig.activeSchemes.fptt
const isWmpActive = () => messageConfig.activeSchemes.wmp

const { VET_VISITS, FPTT, WMP } = getSourceSystems()

const schemeActiveMap = {
  [VET_VISITS]: isAhwrActive,
  [FPTT]: isFpttActive,
  [WMP]: isWmpActive
}

const isSchemeActive = (sourceSystem) => {
  const check = schemeActiveMap[sourceSystem]
  return check ? check() : true  // unspecified schemes pass through
}

module.exports = { isSchemeActive }
