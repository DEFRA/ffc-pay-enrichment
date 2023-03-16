require('./insights').setup()
require('log-timestamp')
const messageService = require('./messaging')

process.on(['SIGTERM', 'SIGINT', 'SIGKILL'], async () => {
  await messageService.stop()
  process.exit(0)
})

module.exports = (async () => {
  await messageService.start()
})()
