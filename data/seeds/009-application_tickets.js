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
  {
    profile_id: '7',
    position: 4,
    approved: true,
  },
  {
    profile_id: '9',
    position: 3,
    approved: true,
  },
  {
    profile_id: '00u13omswyZM1xVya4x7',
    position: 3,
    approved: false,
  },
  {
    profile_id: '10',
    position: 4,
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
