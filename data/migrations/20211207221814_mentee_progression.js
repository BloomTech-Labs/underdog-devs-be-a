exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentee_progression', function (table) {
      table
        .increments('mentee_progression_id')
        .notNullable()
        .unique()
        .primary();
      table
        .string('profile_id')
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .notNullable();
      table.string('progress').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentee_progression');
};
