exports.up = function(knex) {
    return knex.schema.createTable('validations', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('validation_type_id').unsigned().references('id').inTable('validation_types');
      table.boolean('validated').notNullable().defaultTo(false);
      table.dateTime('validation_date').nullable();
      table.string('token').nullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').nullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('validations');
};