const types = [
  { ticket_type: 'action' },
  { ticket_type: 'application' },
  { ticket_type: 'resource' },
  { ticket_type: 'role' },
];
exports.seed = function (knex) {
  return knex('table_name')
    .del()
    .then(function () {
      return knex('ticket_types').insert(types);
    });
};
