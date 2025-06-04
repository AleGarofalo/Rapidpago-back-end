/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 */

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();// Definición de la columna ID como clave primaria autoincremental
        table.uuid('userGUID').notNullable().unique(); // Definición de la columna UserGUID como clave primaria de tipo UUID
        table.string('username').notNullable(); // Definición de la columna Username como no nula
        table.string('password').notNullable(); // Definición de la columna Password como no nula
        table.integer('password_expiration_days').notNullable().defaultTo(180);
        table.date('password_expiration_date').notNullable().defaultTo(knex.raw(`DATE_ADD(CURDATE(), INTERVAL password_expiration_days DAY)`));
        table.string('firstname'); // Definición de la columna FirstName como una cadena de texto
        table.string('lastname'); // Definición de la columna LastName como una cadena de texto
        table.json('dni_type');// Definicion del tipo de cedula
        table.string('dni'); // Definición de la columna DNI como una cadena de texto
        table.json('gender'); // Definicion del genero 
        table.date('birthdate'); // Definición de la fecha de nacimiento
        table.string('email').unique(); // Definición de la columna Email como una cadena de texto
        table.integer('phonecode').notNullable().defaultTo(0); // Añadir la columna phonecode con un valor por defecto de 0
        table.integer('phone').notNullable().defaultTo(0); // Añadir la columna phone con un valor por defecto de 0
        table.json('address'); // Definición de la columna Address como una cadena de texto
        table.boolean('active').defaultTo(true); // Definición de la columna Active como booleana con valor por defecto true
        table.boolean('deleted').defaultTo(false); // Definición de la columna deleted como booleana con valor por defecto false
        // Definición de la columna RoleID como clave foránea que referencia a la columna ID de la tabla Role
        table.integer('roleID').unsigned();
        table.foreign('roleID').references('ID').inTable('roles');
        //table.timestamp('firstSession').nullable();
        table.boolean('first_session').notNullable().defaultTo(false);
        table.timestamp('lastConnection').nullable();
        table.string('register_status').notNullable().defaultTo('Pending');
        table.string('token').nullable(); // Definición de la columna Token como una cadena de texto que puede ser nula
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').nullable();
    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('users'); // Reversión de la migración eliminando la tabla USER
};
