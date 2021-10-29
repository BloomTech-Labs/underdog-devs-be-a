const dummyData = [
  {
    resource_id: 1,
    profile_id: '10',
  },
  {
    resource_id: 1,
    profile_id: '11',
  },
  {
    resource_id: 3,
    profile_id: '10',
    condition_notes:
      'Spencer spilled Kool-Aid on the front page. Still usable just a little red and sticky.',
  },
  {
    resource_id: 2,
    profile_id: '11',
    condition_notes: 'Laptop does not turn on',
  },
];

exports.seed = function (knex) {
  return knex('resources_history')
    .del()
    .then(function () {
      return knex('resources_history').insert(dummyData);
    });
};
