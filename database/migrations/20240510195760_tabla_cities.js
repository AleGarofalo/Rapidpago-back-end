/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cities', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('city').notNullable(); // Definición de la columna City como no nula
        table.boolean('capital').notNullable().defaultTo(false); // Definición de la columna Capital como booleana, no nula y con valor por defecto false
        // Definición de la columna StateID como clave foránea que referencia a la tabla State
        table.integer('stateid').unsigned();
        table.foreign('stateid').references('id').inTable('states');
        table.boolean('active').defaultTo(true);
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cities'); // Reversión de la migración eliminando la tabla City
};
