const dummyData = [
  {
    progress: 'Learning',
  },
  {
    progress: 'In Program',
  },
  {
    progress: 'Interview Prep',
  },
  {
    progress: 'Applying/Interviewing',
  },
  {
    progress: 'Hired',
  },
];
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('mentee_progression')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('mentee_progression').insert(dummyData);
    });
};
