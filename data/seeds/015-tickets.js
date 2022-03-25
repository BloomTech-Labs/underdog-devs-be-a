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
    ticket_type: '2',
    ticket_status: 'pending',
    ticket_subject: 'Application for mentor',
    requested_role: 3,
    submitted_by: '00u13omswyZM1xVya4x7',
  },
];
exports.seed = function (knex) {
  return knex('tickets')
    .del()
    .then(function () {
      return knex('tickets').insert(tickets);
    });
};
