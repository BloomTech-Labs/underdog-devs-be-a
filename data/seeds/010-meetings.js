const dummyData = [
  {
    meeting_id: '982a4867-2b3e-41a7-a5e2-22d86094c980',
    meeting_topic: 'GCA Help',
    meeting_start_time: '2022-07-09T02:01:19',
    meeting_end_time: '2022-07-09T03:01:19',
    mentor_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    mentee_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    admin_meeting_notes: 'Meeting notes here!',
    meeting_missed_by_mentee: 'Attended',
    mentor_meeting_notes: 'Mentor meeting notes',
    mentee_meeting_notes: 'Mentee meeting notes',
    created_at: '2022-10-18T20:14:20.152000',
  },
  {
    meeting_id: '9331ed2a-c062-48e7-9c9f-c3967c3d24a1',
    meeting_topic: 'GCA Help',
    meeting_start_time: '2022-11-09T22:32:16',
    meeting_end_time: '2022-11-09T23:32:16',
    mentor_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    mentee_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    admin_meeting_notes: 'Meeting notes here!',
    meeting_missed_by_mentee: 'Attended',
    mentor_meeting_notes: 'Mentor meeting notes',
    mentee_meeting_notes: 'Mentee meeting notes',
    created_at: '2022-10-18T20:14:20.152000',
  },
  {
    meeting_id: 'c9216f48-4a1c-4b9f-bfa6-f8fa898385a9',
    meeting_topic: 'Resume Help',
    meeting_start_time: '2022-08-15T03:24:25',
    meeting_end_time: '2022-08-15T04:24:25',
    mentor_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    mentee_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    admin_meeting_notes: 'Meeting notes here!',
    meeting_missed_by_mentee: 'Attended',
    mentor_meeting_notes: 'Mentor meeting notes',
    mentee_meeting_notes: 'Mentee meeting notes',
    created_at: '2022-10-18T20:14:20.152000',
  },
];

exports.seed = function (knex) {
  return knex('meetings')
    .del()
    .then(function () {
      return knex('meetings').insert(dummyData);
    });
};
