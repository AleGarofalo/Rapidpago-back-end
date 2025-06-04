/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('parishes', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('parish').notNullable(); // Definición de la columna Parish como no nula
        table.integer('municipalityid').unsigned();// Definición de la columna MunicipalityID como clave foránea que referencia a la tabla Municipality
        table.foreign('municipalityid').references('id').inTable('municipalities');
        table.boolean('active').defaultTo(true);
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('parishes'); // Reversión de la migración eliminando la tabla Parish
};
