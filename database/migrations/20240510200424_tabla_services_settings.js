/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('services_settings', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.integer('serviceID').unsigned(); // Definición de la columna ServiceID como entero sin signo
        table.foreign('serviceID').references('id').inTable('services'); // Clave foránea que referencia la tabla Service
        table.integer('userID').unsigned().notNullable(); // Definición de la columna UserGUID como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.integer('terminalID').unsigned().notNullable(); 
        table.foreign('terminalID').references('id').inTable('terminal_entities'); 
        table.integer('bankID').unsigned().notNullable(); 
        table.foreign('bankID').references('id').inTable('banks'); 
        table.json('settings'); // Definición de la columna Settings como un campo JSON
        table.primary(['serviceID','userID','terminalID','bankID']); // Definición de clave primaria compuesta
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('services_settings'); // Reversión de la migración eliminando la tabla Service_Settings
};
