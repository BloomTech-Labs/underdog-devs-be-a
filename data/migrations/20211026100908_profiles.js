exports.up = (knex) => {
  return knex.schema.createTable('profiles', function (table) {
    table.string('profile_id').notNullable().unique().primary();
    table.string('role').notNullable();
    table.boolean('approved').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
