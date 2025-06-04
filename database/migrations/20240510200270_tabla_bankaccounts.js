/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('bankaccounts', function(table) {
        table.increments('id').primary();
        table.string('merchant_id_code').notNullable();
        table.string('account_number').nullable();
        table.integer('bank_id').unsigned().references('id').inTable('banks');
        table.integer('business_entity_id').unsigned().references('id').inTable('business_entities');
        table.integer('terminalid').unsigned().references('id').inTable('terminal_entities');
        table.boolean('active').notNullable().defaultTo(true);
        table.boolean('deleted').defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('account_banks');
};