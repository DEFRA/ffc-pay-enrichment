require('log-timestamp')
require('./insights').setup()

const { enrichmentConfig } = require('./config')
const messageService = require('./messaging')

process.on(['SIGTERM', 'SIGINT'], async () => {
  await messageService.stop()
  process.exit(0)
})

const startApp = async () => {
  if (enrichmentConfig.processingActive) {
    await messageService.start()
  } else {
    console.info('Processing capabilities are currently not enabled in this environment')
  }
}

(async () => {
  await startApp()
})()

module.exports = startApp
