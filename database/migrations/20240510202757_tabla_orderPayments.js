exports.up = function (knex) {
  return knex.schema.createTable("order_payments", function (table) {
    table.increments("id").primary(); // ID del registro de pago
    table.integer("orderID").unsigned().notNullable(); // ID del pedido
    table.foreign("orderID").references("id").inTable("orders"); // Relación con la tabla de pedidos
    table.integer("paymenttypeID").unsigned().notNullable(); // Tipo de pago
    table.foreign("paymenttypeID").references("id").inTable("paymenttypes");
    table.json("Details").notNullable();
    table.double("payment_amount").notNullable(); // Monto pagado con este método de pago
    table.integer("currencyID").unsigned().notNullable(); // Moneda en que se está realizando el pago
    table.foreign("currencyID").references("id").inTable("currencies");
    table.double("exchange_rate").notNullable(); // Tasa de cambio aplicada para este pago
    table.timestamp("exchange_date").notNullable(); // Fecha de la tasa de cambio utilizada
    table.integer("userID").unsigned().nullable(); // Usuario que hizo el pedido (opcional)
    table.foreign("userID").references("id").inTable("users");
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP")); // Fecha de creación del pago
    table.timestamp("updated_at").nullable(); // Fecha de actualización del pago
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("order_payments");
};
