exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentor_intake', function (table) {
      table.increments('mentor_intake_id').notNullable().unique().primary();
      table
        .string('profile_id')
        .notNullable()
        .unsigned()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.string('email').notNullable();
      table.string('location').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('current_comp');
      table.string('tech_stack').notNullable();
      table.string('can_commit').notNullable();
      table.string('how_commit', 255);
      table.string('other_info', 255);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mentor_intake');
};
