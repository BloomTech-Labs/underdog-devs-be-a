exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('profile_id').notNullable().unique().primary();
      table.string('email').notNullable().unique();
      table.string('first_name');
      table.string('last_name');
      table
        .integer('role_id')
        .unsigned()
        .notNullable()
        .default(4)
        .references('role_id')
        .inTable('roles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.timestamps(true, true);
      table.boolean('pending');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
