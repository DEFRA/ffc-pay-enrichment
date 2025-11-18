const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const plugin = require('../../../../app/server/plugins/errors').plugin

describe('Errors Plugin', () => {
  let server
  let requestLogSpy

  beforeAll(async () => {
    server = Hapi.server()
    await server.register(plugin)

    server.route([
      {
        method: 'GET',
        path: '/regular-error',
        handler: () => { throw new Error('Regular test error') }
      },
      {
        method: 'GET',
        path: '/boom-error',
        handler: () => { throw Boom.badRequest('Hapi Boom test error') }
      }
    ])
  })

  beforeEach(() => {
    jest.clearAllMocks()
    requestLogSpy = jest.fn()
    server.ext('onRequest', (request, h) => {
      request.log = requestLogSpy
      return h.continue
    })
  })

  afterAll(async () => {
    await server.stop()
  })

  test.each([
    { path: '/regular-error', expectedStatus: 500, expectedMessage: 'Regular test error' },
    { path: '/boom-error', expectedStatus: 400, expectedMessage: 'Hapi Boom test error' }
  ])(
    'logs errors correctly for $path',
    async ({ path, expectedStatus, expectedMessage }) => {
      const res = await server.inject({ method: 'GET', url: path })
      expect(res.statusCode).toBe(expectedStatus)
      expect(requestLogSpy).toHaveBeenCalledWith('error', expect.objectContaining({
        statusCode: expectedStatus,
        message: expectedMessage,
        payloadMessage: ''
      }))
    }
  )
})
