const request = require('supertest');
const express = require('express');
const db = require('../../data/db-config');
const authRequired = require('../../api/middleware/authRequired');
const handleError = require('../../api/middleware/handleError');
const applicationRouter = require('../../api/applications/applicationRouter');

// Reset Test Database Before/After Tests

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => await db.seed.run());

afterAll(async () => await db.destroy());

afterEach(() => jest.clearAllMocks());

// Bypass Auth/Permissions Middleware

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

jest.mock('../../api/middleware/permissionsRequired', () => ({
  adminRequired: jest.fn((req, res, next) => next()),
  superAdminRequired: jest.fn((req, res, next) => next()),
}));

// Instantiate Test API

const app = express();
app.use(express.json());
app.use('/application', applicationRouter);
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

describe('Application Router', () => {
  describe('[GET] /application', () => {
    let res;
    beforeAll(async () => {
      res = await request(app).get('/application');
    });

    it('requires authentication', () => {
      expect(authRequired).toBeCalled();
    });

    it('responds with status 200', async () => {
      const expected = 200;
      const actual = res.status;

      expect(actual).toBe(expected);
    });
  });

  describe('[GET] /application/:role', () => {
    describe('success', () => {
      describe('mentor role', () => {
        let res;
        beforeAll(async () => {
          res = await request(app).get('/application/mentor');
        });

        it('responds with status 200', () => {
          const expected = 200;
          const actual = res.status;

          expect(actual).toBe(expected);
        });

        it('returns list of mentor applications', () => {
          const expected = [
            {
              application_id: 5,
              first_name: 'User',
              last_name: '6',
              profile_id: '00u13omswyZM1xVya4x7',
              role_name: 'mentor',
            },
          ];
          const actual = res.body;

          expect(actual).toMatchObject(expected);
        });
      });

      describe('mentee role', () => {
        let res;
        beforeAll(async () => {
          res = await request(app).get('/application/mentee');
        });

        it('responds with status 200', () => {
          const expected = 200;
          const actual = res.status;

          expect(actual).toBe(expected);
        });

        it('returns list of mentee applications', () => {
          const expected = [
            {
              application_id: 2,
              first_name: 'User',
              last_name: '8',
              profile_id: '00u13oned0U8XP8Mb4x7',
              role_name: 'mentee',
            },
            {
              application_id: 6,
              first_name: 'User',
              last_name: '10',
              profile_id: '10',
              role_name: 'mentee',
            },
          ];
          const actual = res.body;

          expect(actual).toMatchObject(expected);
        });
      });
    });
  });

  describe('[GET] /application/profileId/:id', () => {
    describe('success', () => {
      let res;
      beforeAll(async () => {
        res = await request(app).get('/application/profileId/10');
      });

      it('responds with status 200', async () => {
        const expected = 200;
        const actual = res.status;

        expect(actual).toBe(expected);
      });
    });
  });
});
