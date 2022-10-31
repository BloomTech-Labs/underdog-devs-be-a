exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('meetings', function (table) {
      table.string('meeting_id').notNullable().unique().primary();
      table.string('meeting_topic').notNullable();
      table.timestamps(true, true);
      table.string('meeting_start_time').notNullable().unsigned();
      table.string('meeting_end_time').notNullable().unsigned();
      table
        .string('mentor_id')
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .notNullable();
      table
        .string('mentee_id')
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .notNullable();
        table.string('admin_meeting_notes')
             table.string('mentor_meeting_notes').defaultTo(null);
        table.string('mentee_meeting_notes').defaultTo(null);

      table
        .enu('meeting_missed_by_mentee', ['Missed', 'Pending', 'Attended'])
        .notNullable()
        .defaultTo('Pending');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('meetings');
};
