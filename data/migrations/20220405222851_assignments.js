exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('assignments', function (table) {
      table.increments('assignments_id').primary();
      table
        .integer('mentor_id')
        .notNullable()
        .unique()
        .references('mentor_intake_id')
        .inTable('mentor_intake')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .integer('mentee_id')
        .notNullable()
        .unique()
        .references('mentee_intake_id')
        .inTable('mentee_intake')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('assignments');
};
