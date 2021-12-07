const dummyData = [
  {
    profile_id: '7',
    progress: 'Hired',
  },
  {
    profile_id: '10',
    progress: 'Learning',
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
