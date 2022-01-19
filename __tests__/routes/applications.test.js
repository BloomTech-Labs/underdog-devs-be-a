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
      expect(res.body.length).toBe(0);
      expect(Application.getPendingTickets.mock.calls.length).toBe(1);
    });
  });

  describe('GET /application/:role', () => {
    Application.getPendingTicketsByRole.mockResolvedValue({
      profile_id: '00ulzfj6nX79gu0Nh5d6',
      first_name: 'User',
      last_name: '6',
      role_name: 'mentor',
      created_at: '2022-01-13T20:44:31.827Z',
      application_id: 5,
    });
    test('returns 200 OK', async () => {
      const res = await request(server).get('/application/mentor');

      expect(res.status).toBe(200);
    });
    test('application with requested role is returned', async () => {
      const res = await request(server).get('/application/mentor');

      expect(res.body.role_name).toBe('mentor');
    });
  });

  describe('GET /application/id/:id', () => {
    Application.getTicketById.mockResolvedValue({
      profile_id: '00u13oned0U8XP8Mb4x7',
      first_name: 'User',
      last_name: '8',
      role_name: 'mentee',
      created_at: '2022-01-13T20:44:31.827Z',
      application_id: 2,
    });
    test('returns 200 OK', async () => {
      const res = await request(server).get('/application/id/2');

      expect(res.status).toBe(200);
    });
    test('application_id matches requested id', async () => {
      const res = await request(server).get('/application/id/2');

      expect(res.body.application_id).toBe(2);
    });
  });
});
