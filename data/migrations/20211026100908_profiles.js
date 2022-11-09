exports.up = (knex) => {
  return knex.schema.createTable('profiles', function (table) {
    table.string('profile_id').notNullable().unique().primary();
    table.string('user_id').unique();
    table.string('role');
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
