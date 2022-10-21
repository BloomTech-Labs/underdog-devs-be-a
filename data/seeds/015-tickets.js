const tickets = [
  {
    ticket_type: 1,
    ticket_status: 'pending',
    ticket_subject: 'Spencer missed his 2nd weekly session, may be dropped?',
    requested_for: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    submitted_by: '882eb36a-d154-480d-89d4-a1cad1aa7330',
  },
  {
    ticket_type: 2,
    ticket_status: 'approved',
    ticket_subject: 'Application for mentee',
    submitted_by: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
  },
  {
    ticket_type: 1,
    ticket_status: 'pending',
    ticket_subject:
      "My mentor isn't really helping me learn, could I seek reassignment?",
    requested_for: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    submitted_by: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
  },
  {
    ticket_type: 2,
    ticket_status: 'pending',
    ticket_subject: 'Application for mentee',
    submitted_by: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
  },
  {
    ticket_type: 2,
    ticket_status: 'approved',
    ticket_subject: 'Application for mentor',
    submitted_by: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
  },
  {
    ticket_type: 3,
    ticket_status: 'pending',
    ticket_subject:
      'Elon deserves to have the 2020 macbook pro. Of all the mentees I have, I think he has the most potential.',
    requested_for: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
    submitted_by: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
  },
  {
    ticket_type: 2,
    ticket_status: 'pending',
    ticket_subject: 'Application for mentor',
    urgent: true,
    submitted_by: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
  },
  {
    ticket_type: 3,
    ticket_status: 'pending',
    ticket_subject:
      'Foo needs the Computer Monitor, because he has bad eyesight.',
    requested_for: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
    submitted_by: '882eb36a-d154-480d-89d4-a1cad1aa7330',
  },
  {
    ticket_type: 4,
    ticket_status: 'approved',
    ticket_subject: 'Applying for admin role',
    approved_by: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    submitted_by: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
  },
];
exports.seed = function (knex) {
  return knex('tickets')
    .del()
    .then(function () {
      return knex('tickets').insert(tickets);
    });
};
