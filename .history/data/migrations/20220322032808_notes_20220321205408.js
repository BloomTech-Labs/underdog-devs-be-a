exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('notes', function (table) {
      table.string('note_id').notNullable().unique().primary();
      table.string('content_type').notNullable();
      table.text('content').notNullable();
      table.string('level').notNullable();
      table.boolean('visible_to_admin').notNullable();
      table.boolean('visible_moderator').notNullable();
      table.boolean('visible_mentor').notNullable();
      table.string('profile_id_mentor').notNullable();
      table.string('profile_id_mentee').notNullable();
      table.datetime('created_date').notNullable();
      table.datetime('last_modified_date').notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('notes');
};
