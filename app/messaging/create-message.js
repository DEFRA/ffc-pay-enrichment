const createMessage = (body, type, metadata) => {
  return {
    body,
    type,
    source: 'ffc-pay-enrichment',
    metadata
  }
}

module.exports = createMessage
