const request = require('supertest');
const express = require('express');
const actionsModel = require('../../api/actions/actionsModel');
const actionsRouter = require('../../api/actions/actionsRouter');
const server = express();
const sinon = require('sinon');
const app = require('../../api/app');

server.use(express.json());

test('sanity test environment', () => {
  expect(process.env.NODE_ENV).toBe('test');
});

jest.mock('../../api/actions/actionsModel');
jest.mock('../../api/actions/actionsMiddleware', () => ({
  validateSubjectBody: jest.fn((req, res, next) => next()),
}));

describe('actions router endpoints', () => {
  beforeAll(() => {
    server.use('/actions', actionsRouter);
    jest.clearAllMocks();
  });

  describe('GET /actions', () => {
    it('should return 200', async () => {
      actionsModel.findAll.mockResolvedValue([]);
      const res = await request(server).get('/actions');
      expect(res.status).toBe(200);
    });

    it('should return 500 when encountering an unexpected condition', async () => {
      //attempts to stub an error
      sinon.stub(actionsModel, 'findAll').throws(Error('query failed'));
      await request(app) //passes Express app to supertest
        .get('/actions')
        .expect(500);
    });
  });
});
