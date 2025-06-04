/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('states', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('state').notNullable(); // Definición de la columna State como no nula
        table.string('iso_3166_2').nullable(); // Definición de la columna ISO_3166_2 como una cadena de texto
        // Definición de la columna CountryID como clave foránea que referencia a la tabla Country
        table.integer('countryid').unsigned();
        table.foreign('countryid').references('id').inTable('countries');
        table.boolean('active').defaultTo(true);
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('states'); // Reversión de la migración eliminando la tabla State
};
