exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentee_intake', function (table) {
      table.increments('mentee_intake_id').notNullable().unique().primary();
      table
        .integer('application_id')
        .unsigned()
        .notNullable()
        .references('application_id')
        .inTable('application_tickets')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.string('email').notNullable();
      table.string('location').notNullable();
      table.string('name').notNullable();
      table.boolean('lives_in_US').notNullable();
      table.boolean('formerly_incarcerated').notNullable();
      table.string('list_convictions');
      table.string('tech_stack').notNullable();
      table.string('experience_level').notNullable();
      table.string('your_hope').notNullable();
      table.string('other_info');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentee_intake');
};
