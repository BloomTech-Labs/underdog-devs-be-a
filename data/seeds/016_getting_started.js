exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('getting_started')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('getting_started').insert([{ id: 1, secret: '2code' }]);
    });
};
