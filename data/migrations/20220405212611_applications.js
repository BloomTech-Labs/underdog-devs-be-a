exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('applications', function (table) {
      table.increments('application_id');
      // not nullable info about role -- need this to come thru
      table
        .integer('position')
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      // Nullable information about mentor
      table
        .integer('mentee_intake_id')
        .references('mentee_intake_id')
        .inTable('mentee_intake')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      // Nullable information about mentee
      table
        .integer('mentor_intake_id')
        .references('mentor_intake_id')
        .inTable('mentor_intake')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('approved').notNullable().defaultTo(false);
      table.timestamps(true, true);
      table.string('application_notes').defaultTo('');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('applications');
};
