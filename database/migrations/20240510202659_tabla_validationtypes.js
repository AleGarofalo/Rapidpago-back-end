exports.up = function(knex) {
    return knex.schema.createTable('validation_types', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description').nullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').nullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('validation_types');
};