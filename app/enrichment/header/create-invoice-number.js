const { SFI, SFI_PILOT, LUMP_SUMS, CS, BPS, FDMR, MANUAL, ES, FC, IMPS, SFI23, DELINKED, SFI_EXPANDED, COHT_REVENUE, COHT_CAPITAL } = require('../../constants/schemes')
const { INJECTION } = require('../../constants/source-systems')

const createInvoiceNumber = (paymentRequest) => {
  if (paymentRequest?.sourceSystem === INJECTION) {
    return paymentRequest.invoiceNumber
  }
  try {
    const standardSchemeInvoices = new Set([DELINKED, SFI_EXPANDED, COHT_REVENUE, COHT_CAPITAL])
    if (standardSchemeInvoices.has(paymentRequest.schemeId)) {
      return createStandardSchemeInvoiceNumber(paymentRequest)
    }
    const sitiAgriSchemeInvoices = new Set([SFI, SFI_PILOT, LUMP_SUMS, CS, BPS, SFI23])
    if (sitiAgriSchemeInvoices.has(paymentRequest.schemeId)) {
      return createSitiAgriInvoiceNumber(paymentRequest)
    }
    switch (paymentRequest.schemeId) {
      case FDMR:
        return createFdmrInvoiceNumber(paymentRequest)
      case MANUAL:
      case FC:
        return paymentRequest.invoiceNumber
      case ES:
        return createESInvoiceNumber(paymentRequest)
      case IMPS:
        return createIMPSInvoiceNumber(paymentRequest)
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

const createIMPSInvoiceNumber = (paymentRequest) => {
  if (paymentRequest.invoiceNumber.includes('/')) {
    if (paymentRequest.invoiceNumber.includes(`/${paymentRequest.trader}`)) {
      return paymentRequest.invoiceNumber
    }
    const invoiceParts = paymentRequest.invoiceNumber.split('/')
    return `${invoiceParts[0]}/${paymentRequest.trader}${invoiceParts[1]}`
  }
}

const createStandardSchemeInvoiceNumber = (paymentRequest) => {
  const sitiInvoiceNumberElementLength = 7
  if (paymentRequest.invoiceNumber.length >= sitiInvoiceNumberElementLength && paymentRequest.contractNumber && paymentRequest.paymentRequestNumber) {
    return `${paymentRequest.invoiceNumber.charAt(0)}${paymentRequest.invoiceNumber.slice(-sitiInvoiceNumberElementLength)}${paymentRequest.contractNumber}V${paymentRequest.paymentRequestNumber.toString().padStart(3, '0')}`
  }
}

const createDefaultInvoiceNumber = (paymentRequest) => {
  if (paymentRequest.agreementNumber && paymentRequest.paymentRequestNumber) {
    return `${paymentRequest.agreementNumber}V${paymentRequest.paymentRequestNumber.toString().padStart(3, '0')}`
  }
}

module.exports = {
  createInvoiceNumber
}
