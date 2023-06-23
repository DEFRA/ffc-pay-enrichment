const getBalancingSegment = (invoiceLine) => {
  if (invoiceLine.companyCode === '31') {
    return 'EXQ'
  }
  if (invoiceLine.companyCode === '32') {
    return 'EGF'
  }
}

module.exports = {
  getBalancingSegment
}
