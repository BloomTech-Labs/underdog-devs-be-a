const dummyData = [
  {
    amount: 25.53,
    profile_id: '10',
    reason: 'To get a notebook for studying',
  },
  {
    amount: 250.99,
    profile_id: '7',
    reason: "New laptop since their's broke",
  },
  {
    amount: 99.99,
    profile_id: '7',
    reason: 'stipend',
  },
  {
    amount: 99.99,
    profile_id: '00u13oned0U8XP8Mb4x7',
    reason: 'stipend',
  },
];

exports.seed = function (knex) {
  return knex('transactions')
    .del()
    .then(function () {
      return knex('transactions').insert(dummyData);
    });
};
