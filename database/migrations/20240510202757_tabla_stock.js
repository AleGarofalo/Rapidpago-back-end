exports.up = function (knex) {
  return knex.schema.createTable("inventory_transactions", function (table) {
    table.increments("id").primary();
    table.integer("modelID").unsigned().notNullable();
    table.foreign("modelID").references("id").inTable("models");
    table.integer("userID").unsigned().nullable();
    table.foreign("userID").references("id").inTable("users");

    // Reemplazar saleID con orderID
    table.integer("orderID").unsigned().nullable();
    table.foreign("orderID").references("id").inTable("orders"); // Relación con la tabla de pedidos
    table.integer("quantity").notNullable();
    table.enu("transaction_type", ["in", "out"]).notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updated_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("inventory_transactions");
};
