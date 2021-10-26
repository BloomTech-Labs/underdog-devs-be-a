const roles = [
  { role_name: 'superAdmin' },
  { role_name: 'admin' },
  { role_name: 'mentor' },
  { role_name: 'mentee' },
];

exports.seed = function (knex) {
  return knex('roles')
    .del()
    .then(function () {
      return knex('roles').insert(roles);
    });
};