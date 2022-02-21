const request = require('supertest');
const express = require('express');
const db = require('../../data/db-config');
const authRequired = require('../../api/middleware/authRequired');
const rolesRouter = require('../../api/roles/rolesRouter');
const handleError = require('../../api/middleware/handleError');
const { roles } = require('../../data/seeds/001-roles');

// Reset the test database before and after running tests

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => await db.seed.run());

afterAll(async () => await db.destroy());

afterEach(() => jest.clearAllMocks());

// Mock Authentication Middleware

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

jest.mock('../../api/middleware/permissionsRequired', () => ({
  adminRequired: jest.fn((req, res, next) => next()),
  superAdminRequired: jest.fn((req, res, next) => next()),
}));

// Declare Test API

const app = express();
app.use(express.json());
app.use('/roles', rolesRouter);
app.use(handleError);

// Declare Tests

describe('Sanity Checks', () => {
  test('matchers are working', () => {
    expect(true).toBe(true);
    expect(20 - 5).toBe(15);
    expect(9 + 10).not.toEqual(21);
  });

  test('test environment is being used', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});

describe('Roles Router', () => {
  describe('[GET] /roles', () => {
    describe('success', () => {
      let res;
      beforeAll(async () => {
        res = await request(app).get('/roles');
      });

      it('requires authentication', () => {
        expect(authRequired).toBeCalled();
      });

      it('responds with status 200', () => {
        const expected = 200;
        const actual = res.status;

        expect(actual).toBe(expected);
      });

      it('returns list of roles', () => {
        const expected = [...roles];
        const actual = res.body;

        expect(actual).toMatchObject(expected);
      });
    });
  });

  describe('[GET] /roles/:profile_id', () => {
    describe('success', () => {
      const validProfileID = 10;
      let res;
      beforeAll(async () => {
        res = await request(app).get(`/roles/${validProfileID}`);
      });

      it('requires authentication', () => {
        expect(authRequired).toBeCalled();
      });

      it('responds with status 200', () => {
        const expected = 200;
        const actual = res.status;

        expect(actual).toBe(expected);
      });

      it('returns object with role id of profile being checked', () => {
        const expected = { role_id: 4 };
        const actual = res.body;

        expect(actual).toMatchObject(expected);
      });
    });

    describe('failure', () => {
      describe('invalid profile id', () => {
        const invalidProfileID = 10000;
        let res;
        beforeAll(async () => {
          res = await request(app).get(`/roles/${invalidProfileID}`);
        });

        it('responds with status 404', () => {
          const expected = 404;
          const actual = res.status;

          expect(actual).toBe(expected);
        });

        it('returns error message', () => {
          const expected = /user not found/i;
          const actual = res.body.message;

          expect(actual).toMatch(expected);
        });
      });
    });
  });

  describe('[PUT] /roles/:profile_id', () => {
    describe('success', () => {
      const validReqBody = {
        role_id: '5',
        id: 'd376de0577681ca93614',
      };
      let res;
      beforeAll(async () => {
        res = await request(app).put('/roles/10').send(validReqBody);
      });

      it('requires authentication', () => {
        expect(authRequired).toBeCalled();
      });

      it('responds with status 200', () => {
        const expected = 200;
        const actual = res.status;

        expect(actual).toBe(expected);
      });

      it('returns success message', () => {
        const expected = /role has been successfully updated/i;
        const actual = res.body.message;

        expect(actual).toMatch(expected);
      });

      it('returns the updated information', () => {
        const expected = 5;
        const actual = res.body.role_id;

        expect(actual).toBe(expected);
      });
    });

    describe('failure', () => {
      describe('invalid profile id', () => {
        const invalidProfileID = 10000;
        let res;
        beforeAll(async () => {
          res = await request(app).put(`/roles/${invalidProfileID}`);
        });

        it('responds with status 404', () => {
          const expected = 404;
          const actual = res.status;

          expect(actual).toBe(expected);
        });

        it('returns error message', () => {
          const expected = /user not found/i;
          const actual = res.body.message;

          expect(actual).toMatch(expected);
        });
      });

      describe('invalid role id', () => {
        describe('role id is missing', () => {
          const validProfileID = 10;
          let res;
          beforeAll(async () => {
            res = await request(app).put(`/roles/${validProfileID}`);
          });

          it('responds with status 400', () => {
            const expected = 400;
            const actual = res.status;

            expect(actual).toBe(expected);
          });

          it('returns error "role_id is required"', () => {
            const expected = /role_id is required/i;
            const actual = res.body.message;

            expect(actual).toMatch(expected);
          });
        });

        describe('role id is out of bounds', () => {
          const validProfileID = 10;
          const invalidRoleID = -10;
          let res;
          beforeAll(async () => {
            res = await request(app).put(`/roles/${validProfileID}`).send({
              role_id: invalidRoleID,
            });
          });

          it('responds with status 400', () => {
            const expected = 400;
            const actual = res.status;

            expect(actual).toBe(expected);
          });

          it('returns error "invalid role_id"', () => {
            const expected = /invalid role_id/i;
            const actual = res.body.message;

            expect(actual).toMatch(expected);
          });
        });

        describe('new role id matches current id', () => {
          const validProfileID = 10;
          const currentRoleID = 4;
          let res;
          beforeAll(async () => {
            res = await request(app).put(`/roles/${validProfileID}`).send({
              role_id: currentRoleID,
            });
          });

          it('responds with status 400', () => {
            const expected = 400;
            const actual = res.status;

            expect(actual).toBe(expected);
          });

          it('returns error "this is already their current role"', () => {
            const expected = /this is already their current role/i;
            const actual = res.body.message;

            expect(actual).toMatch(expected);
          });
        });
      });
    });
  });
});
