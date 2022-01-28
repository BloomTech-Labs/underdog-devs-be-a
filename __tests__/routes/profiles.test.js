const request = require('supertest');
const express = require('express');
const db = require('../../data/db-config');
const authRequired = require('../../api/middleware/authRequired');
const profileRouter = require('../../api/profile/profileRouter');
const { profileList } = require('../../data/seeds/002-profiles');

// Reset the test database before and after running tests

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

// Declare Mocks Upfront

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
app.use(['/profile', '/profiles'], profileRouter);
// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

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

describe('Profile Router', () => {
  describe('[GET] /profiles', () => {
    let res;
    beforeAll(async () => {
      res = await request(app).get('/profiles');

      expect(authRequired).toBeCalled();
    });

    it('responds with status 200', () => {
      const expected = 200;
      const actual = res.status;

      expect(actual).toBe(expected);
    });

    it('returns a list of profiles', () => {
      const expected = [...profileList];
      const actual = res.body;

      expect(actual).toMatchObject(expected);
    });
  });

  describe('[GET] /profile/:id', () => {
    describe('success', () => {
      let res;
      beforeAll(async () => {
        res = await request(app).get('/profile/00ultwew80Onb2vOT4x6');

        expect(authRequired).toBeCalled();
      });

      it('responds with status 200', async () => {
        const expected = 200;
        const actual = res.status;

        expect(actual).toBe(expected);
      });

      it('returns a profile object', () => {
        const expected = profileList[1];
        const actual = res.body;

        expect(actual).toMatchObject(expected);
      });
    });

    describe('failure', () => {
      describe('invalid profile ID', () => {
        const badID = 'bad-id';

        let res;
        beforeAll(async () => {
          res = await request(app).get(`/profiles/${badID}`);

          expect(authRequired).toBeCalled();
        });

        it('responds with status 404', async () => {
          const expected = 404;
          const actual = res.status;

          expect(actual).toBe(expected);
        });

        it(`returns message "ProfileNotFound"`, () => {
          const expected = /ProfileNotFound/i;
          const actual = res.body.error;

          expect(actual).toMatch(expected);
        });
      });
    });
  });

  describe('[POST] /profile', () => {
    describe('success', () => {
      let res;
      beforeAll(async () => {
        const validReqBody = {
          profile_id: 'bradbowman',
          first_name: 'Brad',
          last_name: 'Bowman',
          email: 'brad.bowman@maildrop.cc',
          role_id: 5,
        };
        res = await request(app).post('/profile').send(validReqBody);

        expect(authRequired).toBeCalled();
      });

      it('responds with status 200', async () => {
        const expected = 200;
        const actual = res.status;

        expect(actual).toBe(expected);
      });

      it('returns success message', () => {
        const expected = /profile created/i;
        const actual = res.body.message;

        expect(actual).toMatch(expected);
      });

      it('returns newly created profile', () => {
        const expected = {
          email: 'brad.bowman@maildrop.cc',
          first_name: 'Brad',
          is_active: null,
          last_name: 'Bowman',
          profile_id: 'bradbowman',
          progress_id: null,
          progress_status: null,
          role_id: 5,
        };
        const actual = res.body.profile;

        expect(actual).toMatchObject(expected);
      });
    });
  });

  describe('[PUT] /profile', () => {
    describe('success', () => {
      let res;
      beforeAll(async () => {
        const validReqBody = {
          profile_id: 'super-update',
          email: 'super-update@maildrop.cc',
        };
        res = await request(app).put('/profile').send(validReqBody);

        expect(authRequired).toBeCalled();
      });

      it('responds with status 200', () => {
        const expected = 200;
        const actual = res.status;

        expect(actual).toBe(expected);
      });
    });
  });
});
