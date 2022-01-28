const request = require('supertest');
const express = require('express');
const indexRouter = require('../../api/index/indexRouter');
const handleError = require('../../api/middleware/handleError');

// Instantiate Test API

const app = express();
app.use(indexRouter);
app.use(handleError);

// Declare Tests

describe('index router endpoints', () => {
  describe('GET /', () => {
    let res;
    beforeAll(async () => {
      res = await request(app).get('/');
    });

    it('responds with status 200', async () => {
      const expected = 200;
      const actual = res.status;

      expect(actual).toBe(expected);
    });

    it('returns "api up" notice', async () => {
      const expected = /up/i;
      const actual = res.body.api;

      expect(actual).toMatch(expected);
    });

    it('returns timestamp', async () => {
      const expected = 'timestamp';
      const actual = res.body;

      expect(actual).toHaveProperty(expected);
    });
  });
});
