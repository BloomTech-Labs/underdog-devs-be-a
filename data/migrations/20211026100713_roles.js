exports.up = function (knex) {
  return knex.schema.createTable('roles', function (table) {
    table.increments('role_id');
    table.string('role_name').notNullable().unique();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('roles');
};
