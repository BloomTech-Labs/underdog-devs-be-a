exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentor_intake', function (table) {
      table.increments('mentor_intake_id').notNullable().unique().primary();
      table
        .string('profile_id')
        .notNullable()
        .unsigned()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.string('email').notNullable();
      table.string('country').notNullable();
      table.string('city');
      table.string('state');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('current_comp');
      table.string('subject').notNullable();
      table.string('experience_level').notNullable();
      table.boolean('industry_knowledge').defaultTo(false);
      table.boolean('job_help').defaultTo(false);
      table.boolean('pair_programming').defaultTo(false);
      table.string('other_info');
      table.string('validateStatus').defaultTo('pending');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentor_intake');
};
