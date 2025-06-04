exports.up = function (knex) {
  return knex.schema.createTable("Business_Structure", function (table) {
    table.increments("id").primary(); // ID único del nodo
    table.string("name").notNullable(); // Nombre del nodo
    table.integer("parent_id").unsigned().nullable(); // Nodo padre (puede ser null)
    table.integer("userID").unsigned().notNullable(); // Cliente dueño de la estructura
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Fecha de creación
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Fecha de última actualización

    table
      .foreign("parent_id")
      .references("id")
      .inTable("Business_Structure")
      .onDelete("CASCADE"); // Relación recursiva
    table
      .foreign("userID")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Relación con cliente
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Business_Structure");
};
