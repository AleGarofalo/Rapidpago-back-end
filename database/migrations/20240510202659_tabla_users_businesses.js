/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users_businesses', function(table) {
        table.integer('userID').unsigned().notNullable(); // Definición de la columna UserGUID como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.integer('business_entity_id').unsigned().notNullable().references('id').inTable('business_entities');
        table.primary(['userID', 'business_entity_id']); // Definición de clave primaria compuesta
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users_businesses'); // Reversión de la migración eliminando la tabla User_POS
};