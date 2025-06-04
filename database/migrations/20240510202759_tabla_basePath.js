exports.up = function (knex) {
  return knex.schema.createTable("basePath", function (table) {
    table.increments("id").primary(); // ID del pago
    table.string("ruta_base").notNullable();
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
  return knex.schema.dropTableIfExists("basePath");
};
