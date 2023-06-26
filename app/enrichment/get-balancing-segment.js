const getBalancingSegment = (companyCode) => {
  if (companyCode === '31') {
    return 'EXQ'
  }
  if (companyCode === '32') {
    return 'EGF'
  }
}

module.exports = {
  getBalancingSegment
}
