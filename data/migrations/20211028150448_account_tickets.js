exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('account_tickets', function (table) {
      table.increments('account_ticket_id').notNullable().unique().primary();
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
      table.string('issue').notNullable();
      table.boolean('pending').defaultTo(true);
      table.boolean('resolved');
      table.boolean('strike').notNullable().defaultTo(false);
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('account_tickets');
};
