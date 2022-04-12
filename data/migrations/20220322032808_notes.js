exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('notes', function (table) {
      table.increments('note_id').primary().notNullable();
      table
        .string('created_by')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .enu('status', [
          'in progress',
          'resolved',
          'no action needed',
          'escalated',
        ])
        .notNullable();
      table.string('content_type').notNullable();
      table.text('content').notNullable();
      table.string('level').notNullable();
      table.boolean('visible_to_admin').notNullable();
      table.boolean('visible_to_mentor').notNullable();
      table.boolean('visible_to_mentee').notNullable();
      table
        .string('mentor_id')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .string('mentee_id')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('notes');
};
