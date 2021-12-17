const request = require('supertest');
const express = require('express');
const Actions = require('../../api/actions/actionsModel');
const actionsRouter = require('../../api/actions/actionsRouter');
const server = express();
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
      Actions.findAll.mockResolvedValue([]);
      const res = await request(server).get('/actions');

      expect(res.status).toBe(200);
    });
  });
});
