/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users_terminals', function(table) {
        table.integer('userID').unsigned().notNullable(); // Definición de la columna UserGUID como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.integer('terminalID').unsigned().notNullable();; // Definición de la columna Cod_terminal como cadena sin signo
        table.foreign('terminalID').references('id').inTable('terminal_entities'); // Clave foránea que referencia la tabla POS
        table.primary(['userID', 'terminalID']); // Definición de clave primaria compuesta
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users_terminals'); // Reversión de la migración eliminando la tabla User_POS
};
