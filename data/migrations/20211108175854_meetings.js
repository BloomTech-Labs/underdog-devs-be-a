exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('meetings', function (table) {
      table.string('meeting_id', 36).notNullable().unique().primary();
      table.timestamps(true, true);
      table.string('meeting_topic', 255).notNullable();
      table.dateTime('meeting_start_time').notNullable().unsigned();
      table.dateTime('meeting_end_time').notNullable().unsigned();
      table
        .string('mentor_id', 36)
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .notNullable();
      table
        .string('mentee_id', 36)
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .notNullable();
      table.string('admin_meeting_notes', 2000).defaultTo(null);
      table
        .enu('meeting_missed_by_mentee', ['Missed', 'Attended'])
        .notNullable()
        .defaultTo('Pending');
      table.string('mentor_meeting_notes', 2000).defaultTo(null);
      table.string('mentee_meeting_notes', 2000).defaultTo(null);

    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('meetings');
};
