exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('ticket_types', function (table) {
      table.increments('ticket_type_id').notNullable().unique().primary();
      table.string('ticket_type').notNullable().unique();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ticket_types');
};
