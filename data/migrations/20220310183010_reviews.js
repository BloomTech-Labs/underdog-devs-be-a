exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('reviews', function (table) {
      table.increments('review_id').notNullable().unique().primary();
      table.string('review').notNullable();
      table
        .integer('mentor_intake_id')
        .unsigned()
        .notNullable()
        .references('mentor_intake_id')
        .inTable('mentor_intake')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .integer('mentee_intake_id')
        .unsigned()
        .notNullable()
        .references('mentee_intake_id')
        .inTable('mentee_intake')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews');
};
