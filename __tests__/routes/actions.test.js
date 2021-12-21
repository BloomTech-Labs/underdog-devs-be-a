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
      expect(res.body.length).toBe(0);
      expect(actionsModel.findAll.mock.calls.length).toBe(1);
    });

    it('should return 500 when encountering an unexpected condition', async () => {
      sinon.stub(actionsModel, 'findAll').throws(Error('query failed'));
      await request(app) //passes Express app to supertest
        .get('/actions')
        .expect(500);
    });
  });

  describe('GET /actions/:id', () => {
    it('should return 200 when profile found', async () => {
      actionsModel.findById.mockResolvedValue({
        id: 'd376de0577681ca93614',
      });
      const res = await request(server).get('/actions/d376de0577681ca93614');

      expect(res.status).toBe(200);
      expect(actionsModel.findById.mock.calls.length).toBe(1);
    });
    it('should return 500 when encountering an unexpected condition', async () => {
      sinon.stub(actionsModel, 'findById').throws(Error('query failed'));
      await request(app) //passes Express app to supertest
        .get('/actions/:id')
        .expect(500);
    });
  });

  describe('POST /actions', () => {
    it('should return 200 when action is created', async () => {
      const action = {
        submitted_by: 'char_varying',
        subject_id: 'char_varying',
        issue: 'Test Issue',
      };
      actionsModel.findById.mockResolvedValue(undefined);
      actionsModel.create.mockResolvedValue([
        Object.assign({ action_ticket_id: '7' }, action),
      ]);
      const res = await request(server).post('/actions').send(action);

      expect(res.status).toBe(201);
      expect(res.body.action.issue).toBe('Test Issue');
      expect(actionsModel.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /actions', () => {
    it('should return 200 when actions is updated', async () => {
      const action = {
        action_ticket_id: 1,
        issue: 'Test Issue changed',
      };
      actionsModel.update.mockResolvedValue([{ issue: 'Test Issue changed' }]);
      actionsModel.findById.mockResolvedValue([action.action_ticket_id]);
      try {
        const res = await request(server)
          .put(`/actions/${action.id}`)
          .send(action);

        expect(res.status).toBe(200);
        expect(res.body.action.issue).toBe('Test Issue changed');
        expect(actionsModel.update.mock.calls.length).toBe(1);
      } catch (err) {
        console.log('catch error', err);
      }
    });
  });
});
