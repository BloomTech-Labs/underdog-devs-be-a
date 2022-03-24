exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('notes', function (table) {
      table.increments('note_id').primary().notNullable();
      table.string('content_type').notNullable();
      table.text('content').notNullable();
      table.string('level').notNullable();
      table.boolean('visible_to_admin').notNullable();
      table.boolean('visible_to_moderator').notNullable();
      table.boolean('visible_to_mentor').notNullable();
      table.string('mentor_id').notNullable();
      table.string('mentee_id').notNullable();
      table.timestamps(true, true);
      table.foreign('mentor_id').references('profile_id').inTable('profiles');
      table.foreign('mentee_id').references('profile_id').inTable('profiles');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('notes');
};
