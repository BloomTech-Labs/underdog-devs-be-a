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

    describe('failure', () => {
      describe('invalid role parameter', () => {
        const invalidRoleName = 'bad-role';
        let res;
        beforeAll(async () => {
          res = await request(app).get(`/application/${invalidRoleName}`);
        });

        it('responds with status 404', () => {
          const expected = 404;
          const actual = res.status;

          expect(actual).toBe(expected);
        });

        it('returns error "role not found"', () => {
          const expected = /role not found/i;
          const actual = res.body.message;

          expect(actual).toMatch(expected);
        });
      });
    });
  });

  describe('[GET] /application/profileId/:id', () => {
    describe('success', () => {
      const validProfileID = 10;
      let res;
      beforeAll(async () => {
        res = await request(app).get(
          `/application/profileId/${validProfileID}`
        );
      });

      it('responds with status 200', () => {
        const expected = 200;
        const actual = res.status;

        expect(actual).toBe(expected);
      });

      it('returns application(s) for a given user', () => {
        const expected = {
          application_id: 6,
          created_at: '2022-01-28T23:38:28.256Z',
          first_name: 'User',
          last_name: '10',
          profile_id: '10',
          role_name: 'mentee',
        };
        const actual = res.body.application;

        expect(actual).toMatchObject(expected);
      });
    });

    describe('failure', () => {
      describe('invalid profile id', () => {
        const invalidProfileID = 10000;
        let res;
        beforeAll(async () => {
          res = await request(app).get(
            `/application/profileId/${invalidProfileID}`
          );
        });

        it('responds with status 404', () => {
          const expected = 404;
          const actual = res.status;

          expect(actual).toBe(expected);
        });

        it('returns error "profile id XX not found"', () => {
          const expected = `profile_id ${invalidProfileID} not found`;
          const actual = res.body.message;

          expect(actual).toMatch(expected);
        });
      });
    });
  });

  // This block describes the expected behaviour of the POST request for submitting new mentor/mentee profile applications
  describe('[POST] /application/new/:role', () => {
    // create some mock variables to submit with each test
    // split this to test endpoints separately (ie, valid and invalid mentor - valid and invalid mentee)
    const validMentee = {
      city: 'Portland',
      convictions: 'String Data',
      country: 'United States',
      email: 'joe2@mageddon.com',
      first_name: 'Joe',
      formerly_incarcerated: true,
      job_help: true,
      last_name: 'Mageddon',
      low_income: true,
      other_info: 'No',
      pair_programming: false,
      referred_by: 'coworker',
      state: 'Oregon',
      tech_stack: 'Design UI/UX',
      underrepresented_group: false,
      validate_status: 'pending',
      is_active: false,
      in_project_underdog: false,
      profile_id: '4e157cae-af53-4645-a865-53a62bcfc08e',
    };

    const validMentor = {
      city: 'Hartford',
      commitment: false,
      country: 'United States',
      current_company: 'AWS',
      current_position: 'Engineering Manager',
      email: 'gilly@woisley.com',
      first_name: 'Gilly',
      industry_knowledge: true,
      job_help: true,
      last_name: 'Woisley',
      other_info: 'Kindness',
      pair_programming: true,
      referred_by: 'facebook',
      state: 'Connecticut',
      tech_stack: [
        'Backend',
        'Frontend',
        'Career Development',
        'Design UI/UX',
        'iOS',
        'Android',
        'Data Science',
      ],
      true: true,
      validate_status: 'pending',
      profile_id: '4e157cae-af53-4645-a865-53a62bcfc08e',
    };
    let role, res;

    describe('new mentor endpoint tests', () => {
      role = 'mentor';
      beforeAll(async () => {
        res = await request(app)
          .post(`/application/new/${role}`)
          .payload({})
          .send();
      });

      it('success', () => {
        // test should expect a status 200 when sending properly formatted payload
        role = 'mentor';
        const expected = 200;
        const actual = res.status;
      });

      it('failure', () => {
        // returns status 400 when sending properly formatted payload to mentee endpoint
      });
    });

    describe('new mentee endpoint tests', () => {
      role = 'mentee';
      beforeAll(async () => {
        res = await request(app).post(
          `/application/new/${role}`,
          (validMentee) => { }
        );
      });
      request(app).post();

      it('invalid mentor application', () => {
        // returns error code 400/401/404 according to error in payload formatting
        // consider checking for issue specific error messages too
      });

      it('invalid mentee application', () => {
        // returns error code 400/401/404 according to error in payload formatting
        // consider checking for issue specific error messages too
      });
    });
  });
});
