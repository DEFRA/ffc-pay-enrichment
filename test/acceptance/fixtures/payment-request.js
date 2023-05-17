const request = {
  sourceSystem: 'SFI',
  batch: 'SITISFI0001_AP_20220908125135717.dat',
  deliveryBody: 'RP00',
  invoiceNumber: 'SFI0000001',
  frn: '1000000001',
  marketingYear: 2022,
  paymentRequestNumber: 1,
  agreementNumber: '00000001',
  contractNumber: '00000001',
  currency: 'GBP',
  schedule: 'Q4',
  dueDate: '2022-12-01',
  value: 1000,
  correlationId: 'fa962440-9b53-4657-9dee-9b6713bb52dc',
  invoiceLines: [
    {
      schemeCode: '80101',
      accountCode: 'SOS273',
      fundCode: 'DRD10',
      description: 'G00 - Gross value of claim',
      value: 1000,
      deliveryBody: 'RP00'
    }
  ]
}

module.exports = request
