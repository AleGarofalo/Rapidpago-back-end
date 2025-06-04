/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('services', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('service').notNullable(); // Definición de la columna Service como no nula
        table.string('description'); // Definición de la columna Description como una cadena de texto
        table.boolean('active').defaultTo(true); // Definición de la columna Active como booleana con valor por defecto true
        table.boolean('deleted').defaultTo(false);
        table.boolean('ispos').defaultTo(false);
        table.double('costo_dolares').defaultTo(20.0);
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('services'); // Reversión de la migración eliminando la tabla Service
};
