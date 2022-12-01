require('./insights').setup()
require('log-timestamp')
const messageService = require('./messaging')

process.on('SIGTERM', async () => {
  await messageService.stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await messageService.stop()
  process.exit(0)
})

const startService = async () => {
  await messageService.start()
}

module.exports = { startService }
