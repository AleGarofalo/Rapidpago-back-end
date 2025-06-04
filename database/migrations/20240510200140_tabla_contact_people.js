/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contact_people", function (table) {
    table.increments("ID").primary(); // Definición de la columna ID como clave primaria autoincremental
    table.string("Name").notNullable(); // Definición de la columna Name como no nula
    table.string("LastName").notNullable(); // Definición de la columna LastName como no nula
    table.integer("phonecode1").notNullable().defaultTo(0); // Añadir la columna phonecode con un valor por defecto de 0
    table.string("Phone1"); // Definición de la columna Phone1 como una cadena de texto
    table.integer("phonecode2").notNullable().defaultTo(0); // Añadir la columna phonecode con un valor por defecto de 0
    table.string("Phone2"); // Definición de la columna Phone2 como una cadena de texto
    table.string("Email"); // Definición de la columna Email como una cadena de texto
    table.string("address"); // Definición de la columna Address como una cadena de texto
    table.boolean("representante_legal").defaultTo(false);
    table.integer("businessid").unsigned(); // Definición de la columna MunicipalityID como clave foránea que referencia a la tabla Municipality
    table.foreign("businessid").references("id").inTable("business_entities");
    table.integer("userID").unsigned().nullable().defaultTo(null); // Definición de la columna userid como clave foránea que referencia la columna UserGUID de la tabla User
    table.foreign("userID").references("id").inTable("users");
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updated_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("contact_people"); // Reversión de la migración eliminando la tabla Contact_Person
};
