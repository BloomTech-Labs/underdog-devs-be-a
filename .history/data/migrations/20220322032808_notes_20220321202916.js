
exports.up = function(knex) {
    return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('profile_id').notNullable().unique().primary();
};

exports.down = function(knex) {
  
};
