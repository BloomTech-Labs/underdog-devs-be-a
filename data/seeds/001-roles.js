const roles = [
  { role_name: 'superAdmin' },
  { role_name: 'admin' },
  { role_name: 'mentor' },
  { role_name: 'mentee' },
  { role_name: 'pending' },
];

const seed = (knex) => {
  return knex('roles')
    .del()
    .then(function () {
      return knex('roles').insert(roles);
    });
};

module.exports = { seed, roles };
