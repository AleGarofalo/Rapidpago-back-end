/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('postal_zones', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('postal_code').notNullable(); // Definición de la columna Postal_Code como no nula
        table.string('town').notNullable(); // Definición de la columna Town como no nula
        table.integer('parishid').unsigned();// Definición de la columna ParishID como clave foránea que referencia a la tabla Parish
        table.foreign('parishid').references('id').inTable('parishes');
        table.boolean('active').defaultTo(true);
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('postal_zones'); // Reversión de la migración eliminando la tabla Postal_Code
};
