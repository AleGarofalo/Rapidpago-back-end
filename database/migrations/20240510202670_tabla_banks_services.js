exports.up = function(knex) {
    return knex.schema.createTable('bank_services', function(table) {
        //table.increments('id').primary();
        table.integer('serviceID').unsigned().references('id').inTable('services');
        table.integer('bankID').unsigned().references('id').inTable('banks');
        table.primary(['serviceID','bankID']); 
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bank_services');
};