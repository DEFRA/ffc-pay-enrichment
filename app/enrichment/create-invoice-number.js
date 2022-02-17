const createInvoiceNumber = (paymentRequest) => {
  return `S${paymentRequest.invoiceNumber
    ? paymentRequest.invoiceNumber.slice(-7)
    : paymentRequest.agreementNumber.slice(-7)}${paymentRequest.contractNumber}V${paymentRequest.paymentRequestNumber.toString().padStart(3, '0')}`
}

module.exports = createInvoiceNumber
