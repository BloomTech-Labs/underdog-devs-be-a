exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('notes', function (table) {
      table.increments('note_id').primary();
      table.string('content_type').notNullable();
      table.text('content').notNullable();
      table.string('level').notNullable();
      table.boolean('visible_to_admin').notNullable();
      table.boolean('visible_to_moderator').notNullable();
      table.boolean('visible_to_mentor').notNullable();
      table.string('profile_id_mentor').notNullable();
      table.string('profile_id_mentee').notNullable();
      table.timestamps(true, true);
      table
        .foreign('profile_id_mentor')
        .references('profile_id')
        .inTable('profiles');
      table
        .foreign('profile_id_mentee')
        .references('profile_id')
        .inTable('profiles');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('notes');
};
