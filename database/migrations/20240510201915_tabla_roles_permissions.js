/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('roles_permissions', function(table) {
        table.integer('roleID').unsigned().notNullable(); // Definición de la columna RoleID como entero sin signo
        table.foreign('roleID').references('id').inTable('roles'); // Clave foránea que referencia la tabla Role
        table.integer('permissionID').unsigned().notNullable();; // Definición de la columna PermissionID como entero sin signo
        table.foreign('permissionID').references('id').inTable('permissions'); // Clave foránea que referencia la tabla Permission
        table.primary(['roleID', 'permissionID']); // Definición de clave primaria compuesta
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles_permissions'); // Reversión de la migración eliminando la tabla Role_Permission
};
