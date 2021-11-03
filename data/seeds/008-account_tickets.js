const dummyData = [
  {
    submitted_by: '7',
    subject_id: '10',
    issue: 'Spencer missed his 2nd weekly session, may be dropped?',
    strike: true,
  },
  {
    submitted_by: '11',
    subject_id: '00u13oned0U8XP8Mb4x7',
    issue:
      "My mentor isn't really helping me learn, could I seek reassignment?",
  },
  {
    submitted_by: '00u13oned0U8XP8Mb4x7',
    subject_id: '11',
    issue:
      'Mentee and I have not been getting along, I suggest a reassignment for best outcome.',
  },
  {
    submitted_by: '9',
    subject_id: '12',
    issue: 'Has not turned in their assignments.',
    strike: true,
  },
];

exports.seed = function (knex) {
  return knex('account_tickets')
    .del()
    .then(function () {
      return knex('account_tickets').insert(dummyData);
    });
};
