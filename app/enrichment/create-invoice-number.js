const { SFI, SFI_PILOT, LUMP_SUMS, CS, BPS, FDMR, MANUAL, ES } = require('../constants/schemes')

const createInvoiceNumber = (paymentRequest) => {
  try {
    switch (paymentRequest.schemeId) {
      case SFI:
      case SFI_PILOT:
      case LUMP_SUMS:
      case CS:
      case BPS:
        return createSitiAgriInvoiceNumber(paymentRequest)
      case FDMR:
        return createFdmrInvoiceNumber(paymentRequest)
      case MANUAL:
        return paymentRequest.invoiceNumber
      case ES:
        return createESInvoiceNumber(paymentRequest)
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

const createFdmrInvoiceNumber = (paymentRequest) => {
  const sitiInvoiceNumberElementLength = 7
  if (paymentRequest.invoiceNumber.length >= sitiInvoiceNumberElementLength && paymentRequest.contractNumber && paymentRequest.paymentRequestNumber) {
    return `F${paymentRequest.invoiceNumber.slice(-sitiInvoiceNumberElementLength)}${paymentRequest.contractNumber}V${paymentRequest.paymentRequestNumber.toString().padStart(3, '0')}`
  }
}

const createESInvoiceNumber = (paymentRequest) => {
  return `I(${paymentRequest.invoiceNumber})${paymentRequest.contractNumber}`
}

const createDefaultInvoiceNumber = (paymentRequest) => {
  if (paymentRequest.agreementNumber && paymentRequest.paymentRequestNumber) {
    return `${paymentRequest.agreementNumber}V${paymentRequest.paymentRequestNumber.toString().padStart(3, '0')}`
  }
}

module.exports = {
  createInvoiceNumber
}
