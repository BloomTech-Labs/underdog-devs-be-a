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
      table.boolean('underrepresented_group').notNullable();
      table.boolean('low_income').notNullable();
      table.string('list_convictions');
      table.string('other_tech');
      table.boolean('front_end').defaultValue(false);
      table.boolean('back_end').defaultValue(false);
      table.boolean('full_stack').defaultValue(false);
      table.boolean('android_mobile').defaultValue(false);
      table.boolean('ios_mobile').defaultValue(false);
      table.string('experience_level').notNullable();
      table.string('other_focus').notNullable();
      table.boolean('career_coaching').defaultValue(false);
      table.boolean('industry_knowledge').defaultValue(false);
      table.boolean('job_help').defaultValue(false);
      table.boolean('pair_programming').defaultValue(false);
      table.string('other_info', 255);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentee_intake');
};
