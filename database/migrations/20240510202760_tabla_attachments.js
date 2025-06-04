exports.up = function (knex) {
  return knex.schema.createTable("attachments", function (table) {
    table.increments("id").primary(); // ID del archivo
    table.string("filename").notNullable(); // Nombre del archivo
    table.string("path"); // Ruta relativa dentro del directorio base
    table.string("fileType", 50); // Tipo de archivo (ej. 'pdf', 'jpg')
    table.integer("fileSize"); // Tamaño del archivo en bytes
    table.boolean("active").defaultTo(true); // Definición de la columna Active como booleana con valor por defecto true
    table.integer("userID").unsigned().nullable(); // Usuario que hizo el pedido (opcional)
    table.foreign("userID").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP")); // Fecha de creación del archivo
    table
      .integer("businessID")
      .unsigned()
      .references("id")
      .inTable("business_entities");
    table.timestamp("updated_at").nullable(); // Fecha de actualización del pedido
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("attachments");
};
