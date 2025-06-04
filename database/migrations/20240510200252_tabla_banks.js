/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('banks', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('name').notNullable(); // Definición de la columna Name como no nula
        table.json('dni_type').notNullable(); // Definición de la columna Rif como no nula
        table.string('dni');
        table.string('display_name'); // Definición de la columna DisplayName como una cadena de texto
        table.boolean('alliance').notNullable().defaultTo(false);
        table.boolean('domiciliation').notNullable().defaultTo(false);
        table.boolean('partial_collection').notNullable().defaultTo(false);
        table.boolean('centralized_collection').notNullable().defaultTo(false);
        table.boolean('active').notNullable().defaultTo(true);
        table.string('code');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('banks'); // Reversión de la migración eliminando la tabla Bank
};

