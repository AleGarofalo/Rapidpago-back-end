/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('businesscategories', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('codeName').notNullable(); // Definición de la columna code_name como no nula
        table.string('displayName').notNullable(); // Definición de la columna display_name como no nula
        table.string('description').notNullable();
        table.boolean('active').defaultTo(true);
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('businesscategories'); // Reversión de la migración eliminando la tabla IndustryType
};
