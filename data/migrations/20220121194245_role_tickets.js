exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('role_tickets', function (table) {
      table.increments('role_ticket_id').notNullable().unique().primary();
      table
        .string('submitted_by')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .string('subject_id')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .integer('requested_role')
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .string('approved_by')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.string('comments');
      table.boolean('pending').defaultTo(true);
      table.boolean('resolved').defaultTo(false);
      table.timestamps(true, true);
    });
};
  
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('role_tickets');
};
