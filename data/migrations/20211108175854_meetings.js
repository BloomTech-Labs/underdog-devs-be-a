exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('meetings', function (table) {
      table.increments('meeting_id').notNullable().unique().primary();
      table.timestamps(true, true);
      table.string('meeting_topic').notNullable();
      table.integer('meeting_start_date').notNullable().unsigned();
      table.integer('meeting_end_date').notNullable().unsigned();
      table
        .string('host_id')
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .notNullable();
      table
        .string('attendee_id')
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .notNullable();
      table.string('meeting_notes').defaultTo(null);
      table
        .enu('meeting_missed', ['Missed', 'Pending', 'Attended'])
        .notNullable()
        .defaultTo('Pending');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('meetings');
};
