exports.up = function (knex) {
  return knex.schema.createTable("orders", function (table) {
    table.increments("id").primary(); // ID del pedido
    table.string("order_number").notNullable(); // Número de orden único para el cliente
    table.double("amount").notNullable(); // Monto total del pedido
    table.double("remaining_balance").notNullable(); // Monto total del pedido
    table.integer("userID").unsigned().nullable(); // Usuario que hizo el pedido (opcional)
    table.foreign("userID").references("id").inTable("users");
    table.integer("saleparameterID").unsigned().notNullable();
    table.foreign("saleparameterID").references("id").inTable("saleparameters");
    table
      .integer("businessID")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("business_entities");
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP")); // Fecha de creación del pedido
    table.timestamp("updated_at").nullable(); // Fecha de actualización del pedido
    table
      .enu("status", ["pendiente", "aprobado", "rechazado"])
      .notNullable()
      .defaultTo("pendiente"); // Estado del pedido
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("orders");
};
