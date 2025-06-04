/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('terminals_services', function(table) {
        table.integer('terminalID').unsigned().notNullable(); // Definición de la columna Cod_terminal como cadena sin signo
        table.foreign('terminalID').references('id').inTable('terminal_entities'); // Clave foránea que referencia la tabla POS
        table.integer('serviceID').unsigned().notNullable();; // Definición de la columna ServiceID como entero sin signo
        table.foreign('serviceID').references('id').inTable('services'); // Clave foránea que referencia la tabla Service
        table.primary(['terminalID', 'serviceID']); // Definición de clave primaria compuesta
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('terminals_services'); // Reversión de la migración eliminando la tabla POS_Service
};
