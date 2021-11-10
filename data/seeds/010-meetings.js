const dummyData = [
  {
    meeting_topic: 'GCA Help',
    meeting_date: '12-24-2021',
    meeting_time: '8am PCT - 8:30am PCT',
    host_id: '7',
    attendee_id: '9',
    meeting_notes: 'Remember to bring a smile',
  },
  {
    meeting_topic: 'Resume Help',
    meeting_date: '11-17-2021',
    meeting_time: '1pm PCT - 2am PCT',
    host_id: '12',
    attendee_id: '7',
    meeting_notes: 'Remember to bring a your resume',
  },
  {
    meeting_topic: 'Job Search',
    meeting_date: '12-12-2021',
    meeting_time: '11am PCT - 12am PCT',
    host_id: '11',
    attendee_id: '10',
    meeting_notes: 'Remember to bring a smile',
  },
  {
    meeting_topic: 'Progress Check',
    meeting_date: '12-4-2021',
    meeting_time: '4pm PCT - 5pm PCT',
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
