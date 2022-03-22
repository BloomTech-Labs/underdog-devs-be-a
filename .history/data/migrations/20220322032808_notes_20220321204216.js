exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('notes', function (table) {
      table.string('note_id').notNullable().unique().primary();
      table.string('').notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('notes');
};
