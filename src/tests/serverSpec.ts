import supertest from 'supertest'

import app from '../server'

const request = supertest(app)

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request
      .get('/api/resize?filename=fjord&width=200&height=200')

    expect(response.status).toEqual(200)
  })
})
