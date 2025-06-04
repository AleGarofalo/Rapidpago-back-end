/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('industrytypes', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.string('industrytype').notNullable(); // Definición de la columna IndustryType como no nula
        // Definición de la columna SectorID como clave foránea que referencia a la tabla Sector
        table.integer('sectorid').unsigned();
        table.foreign('sectorid').references('id').inTable('sectors');
        table.boolean('active').defaultTo(true);
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('industrytypes'); // Reversión de la migración eliminando la tabla IndustryType
};

