exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('mentor_application', function (table) {
      table.increments('mentor_application_id');
      table
        .integer('position')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .integer('mentor_intake_id')
        .notNullable()
        .references('mentor_intake_id')
        .inTable('mentor_intake')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.boolean('approved').notNullable().defaultTo(false);
      table.timestamps(true, true);
      table.string('mentor_application_notes').defaultTo('');
    })
    .createTable('mentee_application', function (table) {
      table.increments('mentee_application_id');
      table
        .integer('position')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .integer('mentee_intake_id')
        .notNullable()
        .references('mentee_intake_id')
        .inTable('mentee_intake')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.boolean('approved').notNullable().defaultTo(false);
      table.timestamps(true, true);
      table.string('mentee_application_notes').defaultTo('');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('mentor_application')
    .dropTableIfExists('mentee_application');
};
