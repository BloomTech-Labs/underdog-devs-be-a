const dummyData = [
  {
    resource_name: 'laptop1',
    profile_id: '10',
  },
  {
    resource_name: 'laptop2',
    profile_id: '11',
  },
  {
    resource_name: 'textbook1',
    profile_id: '10',
  },
  {
    resource_name: 'textbook2',
  },
];

exports.seed = function (knex) {
  return knex('resources')
    .del()
    .then(function () {
      return knex('resources').insert(dummyData);
    });
};
