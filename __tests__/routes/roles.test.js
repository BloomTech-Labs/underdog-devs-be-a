const request = require('supertest');
const express = require('express');
const Roles = require('../../api/roles/rolesModel');
const rolesRouter = require('../../api/roles/rolesRouter');
const server = express();
server.use(express.json());

test('sanity check', () => {
  expect(process.env.NODE_ENV).toBe('test');
});

jest.mock('../../api/roles/rolesModel');
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);
jest.mock('../../api/middleware/permissionsRequired', () => ({
  adminRequired: jest.fn((req, res, next) => next()),
  superAdminRequired: jest.fn((req, res, next) => next()),
}));
jest.mock('../../api/middleware/generalMiddleware', () => ({
  validateUser: jest.fn((req, res, next) => next()),
}));

describe('roles router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use('/roles', rolesRouter);
    jest.clearAllMocks();
  });

  describe('GET /roles', () => {
    it('should return 200', async () => {
      Roles.findAllRoles.mockResolvedValue([]);
      const res = await request(server).get('/roles');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Roles.findAllRoles.mock.calls.length).toBe(1);
    });
  });

  describe('GET /roles/:id', () => {
    it('should return 200 when role is found', async () => {
      Roles.findByProfileId.mockResolvedValue({
        id: 'd376de0577681ca93614',
        role_id: 2,
      });
      const res = await request(server).get('/roles/d376de0577681ca93614');

      expect(res.status).toBe(200);
      expect(res.body.role_id).toBe(2);
    });

    it('should return 404 when profile does not exist', async () => {
      Roles.findByProfileId.mockResolvedValue();

      const res = await request(server).get('/roles/94');

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /roles/:id', () => {
    it('should return 200 when when role updated successfully', async () => {
      const roleBody = { role_id: '4', id: 'd376de0577681ca93614' };
      Roles.updateProfileRoleId.mockResolvedValue(
        roleBody.id,
        roleBody.role_id
      );
      const res = await request(server)
        .put(`/roles/${roleBody.id}`)
        .send(roleBody.role_id);

      expect(res.status).toBe(200);
    });
  });
});
