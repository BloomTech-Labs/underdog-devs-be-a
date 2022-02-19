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
      table.string('country').notNullable();
      table.string('city');
      table.string('state');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.boolean('formerly_incarcerated').notNullable();
      table.boolean('underrepresented_group').notNullable();
      table.boolean('low_income').notNullable();
      table.string('list_convictions');
      table.string('experience_level').notNullable();
      table.string('subject').notNullable();
      table.boolean('industry_knowledge').defaultTo(false);
      table.boolean('job_help').defaultTo(false);
      table.boolean('pair_programming').defaultTo(false);
      table.string('other_info');
      table.string('validateStatus').defaultTo('pending');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentee_intake');
};
