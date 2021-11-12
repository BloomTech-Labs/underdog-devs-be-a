exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('resources', function (table) {
      table.increments('resource_id').notNullable().unique().primary();
      table.timestamps(true, true);
      table.string('resource_name').notNullable();
      table.string('category').notNullable();
      table.string('condition').notNullable();
      table.boolean('assigned').notNullable();
      table
        .string('current_assignee')
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .defaultTo(null);
      table
        .string('previous_assignee')
        .references('profile_id')
        .inTable('profiles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
        .defaultTo(null);
      table.string('monetary_value');
      table.boolean('deductible_donation');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('resources');
};
