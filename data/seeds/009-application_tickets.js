const dummyData = [
  {
    profile_id: '12',
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
