exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('tickets', function (table) {
      table.increments('ticket_id').notNullable().unique().primary();
      table
        .integer('ticket_type')
        .unsigned()
        .notNullable()
        .references('ticket_type_id')
        .inTable('ticket_types')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('ticket_status').notNullable();
      table.string('ticket_subject').notNullable();
      table
        .string('requested_for')
        .unsigned()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('submitted_by')
        .unsigned()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('approved_by')
        .unsigned()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('urgent').default(false);
      table.string('notes');
      //this conflicts with the sendData middleware which does not work with "role_id" (6/4/2022)
      // table
      //   .integer('requested_role')
      //   .unsigned()
      //   .references('role_id')
      //   .inTable('roles')
      //   .onDelete('CASCADE')
      //   .onUpdate('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tickets');
};
