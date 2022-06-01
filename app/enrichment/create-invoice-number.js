const createInvoiceNumber = (paymentRequest) => {
  try {
    return `S${paymentRequest.invoiceNumber
    ? paymentRequest.invoiceNumber.slice(-7)
    : paymentRequest.agreementNumber.slice(-7)}${paymentRequest.contractNumber}V${paymentRequest.paymentRequestNumber.toString().padStart(3, '0')}`
  } catch {
    return undefined
  }
}

module.exports = createInvoiceNumber
