exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('transactions', function (table) {
      table.increments('transaction_id').notNullable().unique().primary();
      table.float('amount').notNullable();
      table
        .string('profile_id')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.string('reason').notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('transactions');
};
