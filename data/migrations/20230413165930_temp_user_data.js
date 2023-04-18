exports.up = function (knex) {
  return knex.schema.createTable('temp_user_data', function (table) {
    table.string('profile_id').notNullable().unique().primary();
    table.string('role').notNullable();
    table.string('email').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('temp_user_data');
};
