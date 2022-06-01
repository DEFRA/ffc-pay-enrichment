const createMessage = (body, type) => {
  return {
    body,
    type,
    source: 'ffc-pay-enrichment'
  }
}

module.exports = createMessage
