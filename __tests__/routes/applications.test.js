const request = require('supertest');
const express = require('express');
const Application = require('../../api/applications/applicationModel');
const applicationRouter = require('../../api/applications/applicationRouter');
const server = express();

server.use(express.json());

test('sanity test environment', () => {
  expect(process.env.NODE_ENV).toBe('test');
});

jest.mock('../../api/applications/applicationModel');

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

jest.mock('../../api/middleware/permissionsRequired', () => ({
  adminRequired: jest.fn((req, res, next) => next()),
  superAdminRequired: jest.fn((req, res, next) => next()),
}));

describe('application router endpoints', () => {
  beforeAll(() => {
    server.use('/application', applicationRouter);
    jest.clearAllMocks();
  });

  describe('GET /application', () => {
    test('returns 200 OK', async () => {
      Application.getPendingTickets.mockResolvedValue([]);
      const res = await request(server).get('/application');

      expect(res.status).toBe(200);
    });
  });

  describe('GET /application/:role', () => {
    test('returns 200 OK', async () => {
      Application.getPendingTicketsByRole.mockResolvedValue([]);
      const res = await request(server).get('/application/mentee');

      expect(res.status).toBe(200);
    });
  });

  describe('GET /application/id/:id', () => {
    test('returns 200 OK', async () => {
      Application.getTicketById.mockResolvedValue([]);
      const res = await request(server).get('/application/mentee');

      expect(res.status).toBe(200);
    });
  });
});
