exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('resources', function (table) {
      table.increments('resource_id').notNullable().unique().primary();
      table.string('resource_name').notNullable();
      table
        .string('profile_id')
        .defaultTo(null)
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('resources');
};
