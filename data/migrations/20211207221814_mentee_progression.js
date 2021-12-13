exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentee_progression', function (table) {
      table.increments('progress_id').notNullable().unique().primary();
      table.string('progress').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentee_progression');
};
