exports.up = function (knex) {
  return knex.schema.createTable("sales", function (table) {
    table.increments("id").primary();
    table.double("total_amount").notNullable();
    table.integer("userID").unsigned().nullable(); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
    table.foreign("userID").references("id").inTable("users");
    table.integer("feetypeID").unsigned().notNullable();
    table.foreign("feetypeID").references("id").inTable("feetypes");
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
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updated_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales");
};
