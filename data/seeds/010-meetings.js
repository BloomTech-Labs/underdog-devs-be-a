const dummyData = [
  {
    meeting_topic: 'GCA Help',
    meeting_start_date: 1640354400,
    meeting_end_date: 1640356200,
    host_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    attendee_id: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
    meeting_notes: 'Remember to bring a smile',
  },
  {
    meeting_topic: 'testing models',
    meeting_start_date: 1640353440,
    meeting_end_date: 1640354210,
    host_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    attendee_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    meeting_notes: 'Remember to bring a smile',
    meeting_missed: 'Missed',
  },
  {
    meeting_topic: 'Resume Help',
    meeting_start_date: 1637175600,
    meeting_end_date: 1637179200,
    host_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    attendee_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    meeting_notes: 'Remember to bring a your resume',
    meeting_missed: 'Attended',
  },
  {
    meeting_topic: 'Job Search',
    meeting_start_date: 1639328400,
    meeting_end_date: 1639332000,
    host_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    attendee_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
    meeting_notes: 'Remember to bring a smile',
    meeting_missed: 'Attended',
  },
  {
    meeting_topic: 'Progress Check',
    meeting_start_date: 1638655200,
    meeting_end_date: 1638658800,
    host_id: 'ba1ac6b7-5b29-449f-8d7e-84a04061510a',
    attendee_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
  },
];

exports.seed = function (knex) {
  return knex('meetings')
    .del()
    .then(function () {
      return knex('meetings').insert(dummyData);
    });
};
