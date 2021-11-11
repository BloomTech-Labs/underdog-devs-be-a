exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentor_intake', function (table) {
      table.increments('mentor_intake_id').notNullable().unique().primary();
      table
        .integer('application_id')
        .unsigned()
        .notNullable()
        .references('application_id')
        .inTable('application_tickets')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentor_intake');
};
