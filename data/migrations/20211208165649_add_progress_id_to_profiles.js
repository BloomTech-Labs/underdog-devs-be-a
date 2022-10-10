exports.up = function (knex) {
  return knex.schema.table('profiles', function (table) {
    table
      .integer('progress_id')
      .unsigned()
      // .references('progress_id')
      // .inTable('mentee_progression')
      // .onUpdate('CASCADE')
      // .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.table('profiles', function (table) {
    table.dropColumn('progress_id');
  });
};
