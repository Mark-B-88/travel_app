import 'regenerator-runtime/runtime'

const app = require('../src/server/app')
const req = require('supertest')

describe('testing the main path', () => {
  test('this should respond with the GET method', async () => {
    const res = await req(app).get('/')
    expect(res.statusCode).toBe(200)
  })
})
