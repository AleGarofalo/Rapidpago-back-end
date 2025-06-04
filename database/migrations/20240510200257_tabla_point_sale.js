/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('point_sale', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.uuid('pos_GUID').notNullable();
        table.string('name').notNullable(); // Definición de la columna Cod_Terminal como no nula
        table.string('description').notNullable(); // Definición de la columna Serial_Number como no nula
        table.json('pos_details').notNullable();
        table.date('association_date').notNullable();
        table.boolean('active').notNullable().defaultTo(true);
        table.boolean('deleted').notNullable().defaultTo(false);
        table.integer('point_sale_category_id').unsigned().notNullable(); // Definición de la columna 
        table.foreign('point_sale_category_id').references('id').inTable('point_sale_categories');
        table.integer('business_id').unsigned().notNullable();
        table.foreign('business_id').references('id').inTable('business_entities');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('point_sale'); // Reversión de la migración eliminando la tabla POS
};
