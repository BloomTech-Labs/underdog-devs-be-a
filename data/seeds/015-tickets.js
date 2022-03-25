const tickets = [
  {
    ticket_type: '1',
    ticket_status: 'pending',
    ticket_subject: 'Spencer missed his 2nd weekly session, may be dropped?',
    requested_for: '10',
    submitted_by: '7',
  },
  {
    ticket_type: '2',
    ticket_status: 'approved',
    ticket_subject: 'Application for mentee',
    requested_role: 4,
    submitted_by: '7',
  },
  {
    ticket_type: '1',
    ticket_status: 'pending',
    ticket_subject:
      "My mentor isn't really helping me learn, could I seek reassignment?",
    requested_for: '00u13oned0U8XP8Mb4x7',
    submitted_by: '11',
  },
  {
    ticket_type: '2',
    ticket_status: 'pending',
    ticket_subject: 'Application for mentee',
    requested_role: 4,
    submitted_by: '12',
  },
  {
    ticket_type: '2',
    ticket_status: 'approved',
    ticket_subject: 'Application for mentor',
    requested_role: 3,
    submitted_by: '9',
  },
  {
    ticket_type: '3',
    ticket_status: 'pending',
    ticket_subject:
      'Elon deserves to have the 2020 macbook pro. Of all the mentees I have, I think he has the most potential.',
    requested_for: '00u13oned0U8XP8Mb4x7',
    submitted_by: '7',
  },
  {
    ticket_type: '2',
    ticket_status: 'pending',
    ticket_subject: 'Application for mentor',
    requested_role: 3,
    urgent: true,
    submitted_by: '00u13omswyZM1xVya4x7',
  },
  {
    ticket_type: '3',
    ticket_status: 'pending',
    ticket_subject:
      'Foo needs the Computer Monitor, because he has bad eyesight.',
    requested_for: '10',
    submitted_by: '9',
  },
  {
    ticket_type: '4',
    ticket_status: 'approved',
    ticket_subject: 'Applying for admin role',
    requested_role: '1',
    approved_by: '00ultwew80Onb2vOT4x6',
    submitted_by: '00ulthapbErVUwVJy4x6',
  },
];
exports.seed = function (knex) {
  return knex('tickets')
    .del()
    .then(function () {
      return knex('tickets').insert(tickets);
    });
};
