exports.up = function(knex) {
    return knex.schema.createTable('saletypes', function(table) {
    table.increments('id').primary();
    table.string('description').notNullable();
    table.boolean('active').defaultTo(true); // Definición de la columna Active como booleana con valor por defecto true
    table.integer('userID').unsigned().nullable(); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
    table.foreign('userID').references('id').inTable('users'); 
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').nullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('saletypes');
};