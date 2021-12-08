exports.up = function (knex) {
  return knex.schema.table('profiles', function (table) {
    table
      .integer('progress_id')
      .references('progress_id')
      .inTable('mentee_progression')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
  });
};

exports.down = function (knex) {
  return knex.schema.table('profiles', function (table) {
    table.dropColumn('progress_id');
  });
};
