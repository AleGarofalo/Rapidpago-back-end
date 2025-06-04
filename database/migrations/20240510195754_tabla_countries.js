/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('countries', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('country').notNullable(); // Definición de la columna Country como no nula
        table.string('iso_3166_1').nullable(); // Definición de la columna ISO_3166_1 como una cadena de texto
        table.string('iso_3166_2').nullable(); // Definición de la columna ISO_3166_2 como una cadena de texto
        table.string('iso_3166_num').nullable(); // Definición de la columna ISO_3166_Num como una cadena de texto
        table.boolean('active').defaultTo(true);
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('countries'); // Reversión de la migración eliminando la tabla Country
};
