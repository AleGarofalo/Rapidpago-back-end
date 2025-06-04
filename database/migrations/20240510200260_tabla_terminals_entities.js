/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('terminal_entities', function(table) {
        table.increments('id').primary();
        table.string('t_guid').notNullable();
        table.string('name').nullable();
        table.string('description').nullable();
        table.json('app_param').nullable();
        table.decimal('fee').unsigned();
        table.integer('terminal_category_id').unsigned().references('id').inTable('terminal_categories');
        //table.integer('account_bank_id').unsigned().references('id').inTable('account_banks');
        //table.integer('business_entity_id').unsigned().references('id').inTable('business_entities');
        table.integer('point_sale_id').unsigned().references('id').inTable('point_sale');
        table.timestamp('association_date').nullable();
        table.boolean('active').notNullable().defaultTo(true);
        table.boolean('deleted').defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('terminal_entities');
};