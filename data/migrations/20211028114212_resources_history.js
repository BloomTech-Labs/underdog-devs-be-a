exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('resources_history', function (table) {
      table.increments('resource_history_id').notNullable().unique().primary();
      table
        .integer('resource_id')
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .string('profile_id')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.timestamps(true, true);
      table.string('condition_notes', 300).defaultTo(null);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('resources_history');
};
