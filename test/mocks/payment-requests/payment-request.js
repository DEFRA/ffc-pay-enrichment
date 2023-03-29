const { GBP } = require('../../../app/constants/currency')
const { AP } = require('../../../app/constants/ledgers')
const { M12 } = require('../../../app/constants/schedules')
const { SFI } = require('../../../app/constants/schemes')
const { ACCOUNT_CODE } = require('../values/account-code')
const { AGREEMENT_NUMBER } = require('../values/agreement-number')
const { CONTRACT_NUMBER } = require('../values/contract-number')
const { CORRELATION_ID } = require('../values/correlation-id')
const { DELIVERY_BODY_RPA } = require('../values/delivery-body')
const { GROSS_DESCRIPTION, PENALTY_DESCRIPTION } = require('../values/description')
const { DUE_DATE } = require('../values/due-date')
const { FRN } = require('../values/frn')
const { FUND_CODE } = require('../values/fund-code')
const { SFI_INVOICE_NUMBER } = require('../values/invoice-number')
const { MARKETING_YEAR } = require('../values/marketing-year')
const { PAYMENT_REQUEST_NUMBER } = require('../values/payment-request-number')
const { SBI } = require('../values/sbi')
const { SOURCE_SYSTEM } = require('../values/source-system')
const { STANDARD_CODE } = require('../values/standard-code')

module.exports = {
  correlationId: CORRELATION_ID,
  schemeId: SFI,
  sourceSystem: SOURCE_SYSTEM,
  deliveryBody: DELIVERY_BODY_RPA,
  invoiceNumber: SFI_INVOICE_NUMBER,
  frn: FRN,
  sbi: SBI,
  paymentRequestNumber: PAYMENT_REQUEST_NUMBER,
  agreementNumber: AGREEMENT_NUMBER,
  contractNumber: CONTRACT_NUMBER,
  marketingYear: MARKETING_YEAR,
  currency: GBP,
  schedule: M12,
  dueDate: DUE_DATE,
  value: 150.00,
  ledger: AP,
  invoiceLines: [{
    standardCode: STANDARD_CODE,
    accountCode: ACCOUNT_CODE,
    fundCode: FUND_CODE,
    description: GROSS_DESCRIPTION,
    value: 250.00
  },
  {
    standardCode: STANDARD_CODE,
    accountCode: ACCOUNT_CODE,
    fundCode: FUND_CODE,
    description: PENALTY_DESCRIPTION,
    value: -100.00
  }]
}
