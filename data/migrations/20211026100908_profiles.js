exports.up = (knex) => {
  return knex.schema.createTable('profiles', function (table) {
    table.string('user_id').notNullable().unique().primary();
    table.string('profile_id').notNullable().unique();
    table.integer('role_id').references('role_id').inTable('roles');
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
