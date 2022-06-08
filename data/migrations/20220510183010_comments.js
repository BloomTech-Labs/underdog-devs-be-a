exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('comments', function (table) {
      table.increments('comment_id').notNullable().unique().primary();
      table.text('comment_text').notNullable();
      table
        .integer('note_id')
        .unsigned()
        .notNullable()
        .references('note_id')
        .inTable('notes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
