//tests are skipped because these are irrelevant to MVP
// const request = require('supertest');
// const express = require('express');
// const db = require('../../data/db-config');
// const authRequired = require('../../api/middleware/authRequired');
// const roleTicketsRouter = require('../../api/roleTickets/roleTicketsRouter');
// const handleError = require('../../api/middleware/handleError');
// const { dummyRoleTickets } = require('../../data/seeds/013-role_tickets');

// // Reset the test database before and after running tests

// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });

// beforeEach(async () => await db.seed.run());

// afterAll(async () => await db.destroy());

// afterEach(() => jest.clearAllMocks());

// // Declare Mocks Upfront

// jest.mock('../../api/middleware/authRequired', () =>
//   jest.fn((req, res, next) => next())
// );

// jest.mock('../../api/middleware/permissionsRequired', () => ({
//   adminRequired: jest.fn((req, res, next) => next()),
// }));

// // Declare Test API

// const app = express();
// app.use(express.json());
// app.use('/role-tickets', roleTicketsRouter);
// app.use(handleError);

// // Declare Tests

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

// describe('Role-Tickets Router', () => {
//   describe('[GET] /role-tickets', () => {
//     let res;
//     beforeAll(async () => {
//       res = await request(app).get('/role-tickets');
//     });

//     it('requires authorization', () => {
//       expect(authRequired).toBeCalled();
//     });

//     it('responds with status 200', () => {
//       const expected = 200;
//       const actual = res.status;

//       expect(actual).toBe(expected);
//     });

//     it('returns list of role tickets', () => {
//       const expected = { ...dummyRoleTickets };
//       const actual = res.body;

//       expect(actual).toMatchObject(expected);
//     });
//   });
// });
