const dummyData = [
  {
    meeting_topic: 'GCA Help',
    meeting_start_date: 1640354400,
    meeting_end_date: 1640356200,
    host_id: '7',
    attendee_id: '9',
    meeting_notes: 'Remember to bring a smile',
  },
  {
    meeting_topic: 'testing models',
    meeting_start_date: 1640353440,
    meeting_end_date: 1640354210,
    host_id: '7',
    attendee_id: '00ultx74kMUmEW8054x6',
    meeting_notes: 'Remember to bring a smile',
    meeting_missed: 'Missed',
  },
  {
    meeting_topic: 'Resume Help',
    meeting_start_date: 1637175600,
    meeting_end_date: 1637179200,
    host_id: '12',
    attendee_id: '7',
    meeting_notes: 'Remember to bring a your resume',
  },
  {
    meeting_topic: 'Job Search',
    meeting_start_date: 1639328400,
    meeting_end_date: 1639332000,
    host_id: '11',
    attendee_id: '10',
    meeting_notes: 'Remember to bring a smile',
  },
  {
    meeting_topic: 'Progress Check',
    meeting_start_date: 1638655200,
    meeting_end_date: 1638658800,
    host_id: '9',
    attendee_id: '7',
  },
];

exports.seed = function (knex) {
  return knex('meetings')
    .del()
    .then(function () {
      return knex('meetings').insert(dummyData);
    });
};
