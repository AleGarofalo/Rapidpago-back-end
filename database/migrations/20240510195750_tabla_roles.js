/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('roles', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('role').notNullable(); // Definición de la columna Role como no nula
        table.string('description'); // Definición de la columna Description como una cadena de texto
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles'); // Reversión de la migración eliminando la tabla ROLE
};

