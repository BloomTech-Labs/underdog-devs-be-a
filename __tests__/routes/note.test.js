const request = require('supertest');
const express = require('express');
const db = require('../../data/db-config');
const authRequired = require('../../api/middleware/authRequired');
const handleError = require('../../api/middleware/handleError');
const notesRouter = require('../../api/notes/noteRouter');

// Reset Test Database Before/After Tests

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => await db.seed.run());

afterAll(async () => await db.destroy());

afterEach(() => jest.clearAllMocks());

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
app.use('/notes', notesRouter);
app.use(handleError);

/**
tets cases

admin can retrieve all note
admin can retrieve note per id

mentor can retrieve notes
mentor can retrieve notes per assigned mentee
mentor can 

*/

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

describe('Notes Router', () => {
  describe('[GET] /notes', () => {
    let res;
    beforeAll(async () => {
      res = await request(app).get('/notes');
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
});
