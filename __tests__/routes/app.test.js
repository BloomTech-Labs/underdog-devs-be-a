const request = require('supertest');
const server = require('../../api/app');
// const db = require('../../data/db-config.js');

test('sanity test environment', () => {
  expect(process.env.NODE_ENV).toBe('test');
});

describe('GET /testing', () => {
  it('should return 404', async () => {
    const res = await request(server).get('/testing');

    expect(res.status).toBe(404);
  });
});
