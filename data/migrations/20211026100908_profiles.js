exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('profile_id').notNullable().unique().primary();
      table.string('email').notNullable().unique();
      table.string('first_name');
      table.string('last_name');
      table.string('location');
      table.string('company');
      table.specificType('tech_stack', 'text ARRAY');
      table
        .integer('role_id')
        .unsigned()
        .notNullable()
        .default(5)
        .references('role_id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps(true, true);
      table.boolean('is_active');
      table.string('progress_status');
      table.float('attendance_rate').notNullable().unsigned().default(1.0);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
