const dummyData = [
  {
    submitted_by: '7',
    message:
      'Bob deserves to have the 2020 macbook pro. Of all the mentees I have, I think he has the most potential.',
  },
  {
    submitted_by: '9',
    message: 'Foo needs the Computer Monitor, because he has bad eyesight.',
  },
];
exports.seed = function (knex) {
  return knex('resource_tickets')
    .del()
    .then(function () {
      return knex('resource_tickets').insert(dummyData);
    });
};
