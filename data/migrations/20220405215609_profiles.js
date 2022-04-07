exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('profile_id').notNullable().primary().unique();
      table
        .integer('application_id')
        .unsigned()
        .notNullable()
        .references('application_id')
        .inTable('applications')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .integer('mentor_id')
        .unique()
        .references('mentor_intake_id')
        .inTable('mentor_intake');
      table
        .integer('mentee_id')
        .unique()
        .references('mentee_intake_id')
        .inTable('mentee_intake');
      table.timestamps(true, true);
      table.boolean('profile_is_active').default(true);
      table.string('profile_progress_status');
      table
        .float('profile_attendance_rate')
        .notNullable()
        .unsigned()
        .default(1.0);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
