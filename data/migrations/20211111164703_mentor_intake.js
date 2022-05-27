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
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('country').notNullable();
      table.string('state');
      table.string('city');
      table.string('current_company');
      table.string('current_position');
      table.specificType('tech_stack', 'text ARRAY');
      table.boolean('job_help').defaultTo(false);
      table.boolean('industry_knowledge').defaultTo(false);
      table.boolean('pair_programming').defaultTo(false);
      table.string('commitment');
      table.string('referred_by');
      table.string('other_info');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentor_intake');
};
