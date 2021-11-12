exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('resource_tickets', function (table) {
      table.increments('resource_ticket_id').notNullable().unique().primary();
      table.timestamps(true, true);
      table
        .string('submitted_by')
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .notNullable();
      table.string('message').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('resource_tickets');
};
