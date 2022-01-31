exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('application_tickets', function (table) {
      table.increments('application_id').notNullable().unique().primary();
      table
        .integer('position')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .string('profile_id')
        .notNullable()
        .unsigned()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.boolean('approved').notNullable().defaultTo(false);
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('application_tickets');
};
