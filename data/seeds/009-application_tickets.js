const dummyData = [
  {
    profile_id: '12',
    position: 4,
    approved: false,
  },
  {
    profile_id: '00u13oned0U8XP8Mb4x7',
    position: 3,
    approved: false,
  },
];

exports.seed = function (knex) {
  return knex('application_tickets')
    .del()
    .then(function () {
      return knex('application_tickets').insert(dummyData);
    });
};
