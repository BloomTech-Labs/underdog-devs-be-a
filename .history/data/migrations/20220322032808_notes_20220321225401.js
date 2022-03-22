exports.up = (knex) => {
  return knex
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('notes', function (table) {
      table
        .uuid('note_id')
        .notNullable()
        .unique()
        .primary()
        .defaultTo(knex.schema.raw('uuid_generate_v4()'));
      table.string('content_type').notNullable();
      table.text('content').notNullable();
      table.string('level').notNullable();
      table.boolean('visible_to_admin').notNullable();
      table.boolean('visible_to_moderator').notNullable();
      table.boolean('visible_to_mentor').notNullable();
      table.string('profile_id_mentor').notNullable();
      table.string('profile_id_mentee').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('notes');
};
