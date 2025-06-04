/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('business_entities', function(table) {
        table.increments('id').primary(); // Definición de la columna ID como clave primaria autoincremental
        table.uuid('be_GUID').unique(); // Definición de la columna MerchantGUID como una cadena de texto única
        table.json('dni_type').notNullable();
        table.string('dni').notNullable();
        table.json('address').notNullable();
        table.json('business_details').notNullable();
        table.string('legal_name').notNullable(); // Definición de la columna Name como no nula
        table.string('comercial_name'); // Definición de la columna FantasyName como una cadena de texto
        table.boolean('active').defaultTo(true); // Definición de la columna Active como booleana con valor por defecto true
        table.boolean('deleted').defaultTo(false);
        table.date('association_date'); // Definición de la fecha de asociacion
        // Definición de la columna business_category_id como clave foránea que referencia a la columna id de la tabla business_categories
        table.integer('business_category_id').unsigned().notNullable(); // Definición de la columna 
        table.foreign('business_category_id').references('id').inTable('businesscategories');
        // Definición de la columna business_parent_id como clave foránea que referencia a la columna id de la tabla business_entities
        table.integer('business_parent_id').unsigned().nullable(); // Permite nulos
        table.foreign('business_parent_id').references('id').inTable('business_entities');
        table.integer('userID').unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
        table.foreign('userID').references('id').inTable('users'); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('business_entities'); // Reversión de la migración eliminando la tabla business_entities
};
