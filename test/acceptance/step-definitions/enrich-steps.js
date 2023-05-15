const { Given, When, Then, Before, setDefaultTimeout } = require('@cucumber/cucumber')
const { clearSubscription, sendMessage, receiveMessages } = require('../support/message-service')
const { createDefaultPaymentRequestWith } = require('../support/request-factory')
const config = require('../support/config')
const __ = require('hamjest')

setDefaultTimeout(60 * 1000)

Before({ name: 'Clear topic to ensure clean test run' }, async function () {
  await clearSubscription(config.processingSubscription)
  await clearSubscription(config.paymentSubscription)
})

Given('a valid payment request is received containing details', async function (dataTable) {
  const incomingRequest = dataTable.rowsHash()
  const updatedRequest = createDefaultPaymentRequestWith(incomingRequest)
  await sendMessage(updatedRequest)
})

When('the payment request is enriched', function () {
  // Syntatic sugar
})

Then('the enriched payment request should be transformed to:', async function (dataTable) {
  const values = dataTable.rowsHash()
  const messages = await receiveMessages(config.processingSubscription)

  const expectedFields = {
    ledger: values.ledger,
    dueDate: values.dueDate,
    schemeId: __.number(),
    invoiceLines: [
      {
        accountCode: values.accountCode,
        description: values.description
      }]
  }
  __.assertThat(messages.length, __.greaterThan(0))

  messages.forEach(x => {
    __.assertThat(x, __.hasDeepProperties(expectedFields))
  })
})
