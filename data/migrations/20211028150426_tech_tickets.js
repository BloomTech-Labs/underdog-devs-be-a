exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('tech_tickets', function (table) {
      table.increments('tech_ticket_id').notNullable().unique().primary();
      table
        .string('submitted_by')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .string('recipient')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.string('reason').notNullable();
      table.boolean('pending').defaultTo(true);
      table.boolean('granted');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('tech_tickets');
};
