exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentee_intake', function (table) {
      table.increments('mentee_intake_id').notNullable().unique().primary();
      table
        .string('profile_id')
        .unsigned()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.string('email').notNullable().unique();
      table.string('location').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.boolean('lives_in_us').notNullable();
      table.boolean('formerly_incarcerated').notNullable();
      table.string('list_convictions');
      table.string('tech_stack').notNullable();
      table.string('experience_level').notNullable();
      table.string('your_hope').notNullable();
      table.string('other_info', 255);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentee_intake');
};
