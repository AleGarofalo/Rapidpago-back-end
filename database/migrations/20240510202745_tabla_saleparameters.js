exports.up = function(knex) {
    return knex.schema.createTable('saleparameters', function(table) {
    table.increments('id').primary();
    table.timestamp('start_date').nullable();
    table.timestamp('end_date').nullable();
    table.integer('quota').notNullable();
    table.double('amount').notNullable();
    table.integer('days').notNullable();
    table.boolean('active').defaultTo(true); // Definición de la columna Active como booleana con valor por defecto true
    table.integer('userID').unsigned().nullable(); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
    table.foreign('userID').references('id').inTable('users');  
    table.integer('saletypeID').unsigned().notNullable(); 
    table.foreign('saletypeID').references('id').inTable('saletypes');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').nullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('saleparameters');
};