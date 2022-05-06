exports.up = function (knex) {
    return knex.schema.createTable('getting_started', (table) => {
      table.increments('id');
      table.string('secret');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('getting_started');
  };
  