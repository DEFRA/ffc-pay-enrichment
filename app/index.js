require('./insights').setup()
require('log-timestamp')
const messageService = require('./messaging')

process.on(['SIGTERM', 'SIGINT'], async () => {
  await messageService.stop()
  process.exit(0)
})

module.exports = (async () => {
  await messageService.start()
})()
