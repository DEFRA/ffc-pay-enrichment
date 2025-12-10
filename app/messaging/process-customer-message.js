const util = require('util')
const { saveUpdate } = require('../customer')
const { sendMessage } = require('./send-message')
const { CUSTOMER_UPDATE_PROCESSING_FAILED } = require('../constants/types')

const processCustomerMessage = async (message, receiver) => {
  const update = message.body
  try {
    console.log('Customer update received:', util.inspect(update, false, null, true))
     if (
      !update?.frn ||
      (!update.vendor && !update.trader && !update.sbi)
    ) {
      throw new Error('Invalid customer update message')
    }
    await saveUpdate(update)
    console.log('Customer update processed')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process customer update request:', util.inspect(err.message, false, null, true))
    await sendMessage({ update, updated: false, error: err.message }, CUSTOMER_UPDATE_PROCESSING_FAILED, update)
    await receiver.deadLetterMessage(message)
  }
}

module.exports = {
  processCustomerMessage
}
