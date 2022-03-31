const request = require('supertest');
const express = require('express');
const db = require('../../data/db-config');
const authRequired = require('../../api/middleware/authRequired');
const handleError = require('../../api/middleware/handleError');
const notesRouter = require('../../api/notes/noteRouter');

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

const app = express();
app.use(express.json());
app.use('/notes', notesRouter);
app.use(handleError);
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
    describe('succeed', () => {
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
    describe('failed', () => {});
  });

  describe('[GET] /notes/note_id', () => {
    describe('succeed', () => {
      let res;
      beforeAll(async () => {
        res = await request(app).get('/notes/1');
      });

      it('requires authentication', () => {
        expect(authRequired).toBeCalled();
      });

      it('responds with status 200', async () => {
        const expected = 200;
        const actual = res.status;
        expect(actual).toBe(expected);
      });

      it('responds with non empty object', async () => {
        const expected = /some text here/i;
        const actual = res.text;
        expect(actual).toMatch(expected);
      });
    });
    describe('failed', () => {
      describe('case - failed 404 error', () => {
        let res;
        beforeAll(async () => {
          res = await request(app).get('/notes/100');
        });

        it('requires authentication', () => {
          expect(authRequired).toBeCalled();
        });

        it('responds with status 200', async () => {
          const expected = 404;
          const actual = res.status;
          expect(actual).toBe(expected);
        });
      });
    });
  });

  describe('[GET] /notes/mentee/mentee_id', () => {
    describe('succeed', () => {
      let res;
      beforeAll(async () => {
        res = await request(app).get('/notes/mentee/00ultwqjtqt4VCcS24x6');
      });
      it('requires authentication', () => {
        expect(authRequired).toBeCalled();
      });
      it('responds with status 200', async () => {
        const expected = 200;
        const actual = res.status;
        expect(actual).toBe(expected);
      });

      it('responds with non empty object', async () => {
        const expected = 5;
        const actual = res.body.length;
        expect(actual).toBe(expected);
      });
    });

    describe('failed', () => {
      describe('case - failed 404 error', () => {
        let res;
        beforeAll(async () => {
          res = await request(app).get('/notes/mentee/-1');
        });
        it('requires authentication', () => {
          expect(authRequired).toBeCalled();
        });
        it('responds with status 200', async () => {
          const expected = 404;
          const actual = res.status;
          expect(actual).toBe(expected);
        });
      });

      it('sanity', () => {
        expect(1).toBe(1);
      });
    });
  });

  describe('[POST] /notes', () => {
    describe('succeed', () => {
      let res;
      beforeAll(async () => {
        res = await request(app).post('/notes').send({
          content_type: 'type a',
          status: 'in progress',
          content: 'expect some text here',
          level: 'low',
          visible_to_admin: true,
          visible_to_mentor: true,
          mentor_id: '00u13omswyZM1xVya4x7',
          mentee_id: '00u13oned0U8XP8Mb4x7',
        });
      });

      it('requires authentication', () => {
        expect(authRequired).toBeCalled();
      });

      it('responds with status 201', async () => {
        const expected = 201;
        const actual = res.status;
        expect(actual).toBe(expected);
      });
    });
    describe('failed', () => {
      describe('case - not enough fields', () => {
        let res;
        beforeAll(async () => {
          res = await request(app).post('/notes').send({
            // content_type: 'type a',
            status: 'in progress',
            content: 'expect some text here',
            level: 'low',
            visible_to_admin: true,
            visible_to_mentor: true,
            mentor_id: '00u13omswyZM1xVya4x7',
            mentee_id: '00u13oned0U8XP8Mb4x7',
          });
        });

        it('responds with error message, please include all note data', async () => {
          const expected = /please include all note data/i;
          const actual = res.body.message;
          expect(actual).toMatch(expected);
        });
      });

      describe('case - invalid status', () => {
        let res;
        beforeAll(async () => {
          res = await request(app).post('/notes').send({
            content_type: 'type a',
            status: 'in progresses',
            content: 'expect some text here',
            level: 'low',
            visible_to_admin: true,
            visible_to_mentor: true,
            mentor_id: '00u13omswyZM1xVya4x7',
            mentee_id: '00u13oned0U8XP8Mb4x7',
          });
        });

        it('responds with error message, please include all note data', async () => {
          const expected = /status must be /i;
          const actual = res.body.message;
          expect(actual).toMatch(expected);
        });
      });

      describe('case - mentor_id not found', () => {
        let res;
        beforeAll(async () => {
          res = await request(app).post('/notes').send({
            content_type: 'type a',
            status: 'in progresses',
            content: 'expect some text here',
            level: 'low',
            visible_to_admin: true,
            visible_to_mentor: true,
            mentor_id: '00u13omswyZM1xVya4x77',
            mentee_id: '00u13oned0U8XP8Mb4x7',
          });
        });

        it('responds with error message, please include all note data', async () => {
          const expected = /status must be /i;
          const actual = res.body.message;
          expect(actual).toMatch(expected);
        });
      });

      describe('case - mentee_id not found', () => {
        let res;
        beforeAll(async () => {
          res = await request(app).post('/notes').send({
            content_type: 'type a',
            status: 'in progresses',
            content: 'expect some text here',
            level: 'low',
            visible_to_admin: true,
            visible_to_mentor: true,
            mentor_id: '00u13omswyZM1xVya4x7',
            mentee_id: '00u13oned0U8XP8Mb4x77',
          });
        });

        it('responds with error message, please include all note data', async () => {
          const expected = /status must be /i;
          const actual = res.body.message;
          expect(actual).toMatch(expected);
        });
      });
    });
  });

  describe('[PUT] /notes', () => {
    describe('succeed', () => {
      let resPost, resPut;
      beforeAll(async () => {
        resPost = await request(app).post('/notes').send({
          content_type: 'type a',
          status: 'in progress',
          content: 'some text here',
          level: 'low',
          visible_to_admin: true,
          visible_to_mentor: true,
          mentor_id: '00u13omswyZM1xVya4x7',
          mentee_id: '00u13oned0U8XP8Mb4x7',
        });

        resPut = await request(app)
          .put(`/notes/${resPost.body[0].note_id}`)
          .send({
            content: 'new content',
          });
      });

      it('requires authentication', () => {
        expect(authRequired).toBeCalled();
      });

      it('content to match new content', async () => {
        const expected = /new content/i;
        const actual = resPut.text;
        expect(actual).toMatch(expected);
      });
    });
    describe('failed', () => {
      describe('case - invalid note_id', () => {
        let resPost, resPut;
        beforeAll(async () => {
          resPost = await request(app).post('/notes').send({
            content_type: 'type a',
            status: 'in progress',
            content: 'some text here',
            level: 'low',
            visible_to_admin: true,
            visible_to_mentor: true,
            mentor_id: '00u13omswyZM1xVya4x7',
            mentee_id: '00u13oned0U8XP8Mb4x7',
          });

          resPut = await request(app).put(`/notes/9999999`).send({
            content: 'new content',
          });
        });

        it('requires authentication', () => {
          expect(authRequired).toBeCalled();
        });

        it('content to match new content', async () => {
          const expected = /id does not exist/i;
          const actual = resPut.body.message;
          expect(actual).toMatch(expected);
        });
      });
    });
  });

  describe('[DELETE] /notes', () => {
    describe('succeed', () => {
      let resPost, resDelete;
      beforeAll(async () => {
        resPost = await request(app).post('/notes').send({
          content_type: 'type a',
          content: 'some text here',
          status: 'in progress',
          level: 'low',
          visible_to_admin: true,
          visible_to_moderator: true,
          visible_to_mentor: true,
          mentor_id: '00u13omswyZM1xVya4x7',
          mentee_id: '00u13oned0U8XP8Mb4x7',
        });

        resDelete = await request(app).delete(
          `/notes/${resPost.body[0].note_id}`
        );
      });

      it('requires authentication', () => {
        expect(authRequired).toBeCalled();
      });

      it('content to match new content', async () => {
        const expected = 200;
        const actual = resDelete.status;
        expect(actual).toBe(expected);
      });
    });
    describe('failed', () => {
      describe('case - no id not found', () => {
        let resDelete;
        beforeAll(async () => {
          resDelete = await request(app).delete(`/notes/-1`);
        });

        it('requires authentication', () => {
          expect(authRequired).toBeCalled();
        });

        it('content to match new content', async () => {
          const expected = /id does not exist/i;
          const actual = resDelete.body.message;
          expect(actual).toMatch(expected);
        });
      });
    });
  });
});
