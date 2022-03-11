
exports.up = function (knex) {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('reviews', function (table) {
            table.increments('review_id').notNullable().unique().primary();
            table.string('review').notNullable();
            table
                .string('mentor_id')
                .unsigned()
                .notNullable()
                .references('profile_id')
                .inTable('profiles')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table
                .string('mentee_id')
                .unsigned()
                .notNullable()
                .references('profile_id')
                .inTable('profiles')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

        });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('reviews');
};
