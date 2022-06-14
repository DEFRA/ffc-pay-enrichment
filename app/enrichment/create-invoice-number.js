const createInvoiceNumber = (paymentRequest) => {
  try {
    switch (paymentRequest.schemeId) {
      case 1:
      case 2:
      case 3:
        return createSitiAgriInvoiceNumber(paymentRequest)
      default:
        return createDefaultInvoiceNumber(paymentRequest)
    }
  } catch {
    return undefined
  }
}

const createSitiAgriInvoiceNumber = (paymentRequest) => {
  const sitiInvoiceNumberElementLength = 7
  if (paymentRequest.invoiceNumber.length >= sitiInvoiceNumberElementLength && paymentRequest.contractNumber && paymentRequest.paymentRequestNumber) {
    return `S${paymentRequest.invoiceNumber.slice(-sitiInvoiceNumberElementLength)}${paymentRequest.contractNumber}V${paymentRequest.paymentRequestNumber.toString().padStart(3, '0')}`
  }
}

const createDefaultInvoiceNumber = (paymentRequest) => {
  if (paymentRequest.agreementNumber && paymentRequest.paymentRequestNumber) {
    return `${paymentRequest.agreementNumber}V${paymentRequest.paymentRequestNumber.toString().padStart(3, '0')}`
  }
}

module.exports = createInvoiceNumber
