exports.up = function (knex) {
  return knex.schema.createTable("salepayments", function (table) {
    table.increments("id").primary(); // ID del pago
    table.integer("saleID").unsigned().notNullable(); // ID de la venta asociada
    table.foreign("saleID").references("id").inTable("sales");
    table.double("amount").notNullable(); // Monto pagado en esta moneda
    table.double("exchange_rate").notNullable(); // Tasa de cambio aplicada a esta moneda
    table.timestamp("exchange_date").notNullable(); // Fecha de la tasa de cambio
    table.integer("currencyID").unsigned().notNullable(); // Moneda del pago
    table.foreign("currencyID").references("id").inTable("currencies");
    table.integer("paymenttypeID").unsigned().notNullable(); // Tipo de pago
    table.foreign("paymenttypeID").references("id").inTable("paymenttypes");
    table.integer("userID").unsigned().nullable(); // Usuario que hizo el pedido (opcional)
    table.foreign("userID").references("id").inTable("users");
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP")); // Fecha de creación del pedido
    table.timestamp("updated_at").nullable(); // Fecha de actualización del pedido
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("salepayments");
};
