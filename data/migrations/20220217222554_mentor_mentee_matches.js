exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentor_mentee_matches', function (table) {
      table.increments('match_id').notNullable().unique().primary();
      table
        .string('mentor_id')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .string('mentee_id')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('mentor_mentee_matches');
};
