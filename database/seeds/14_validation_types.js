exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('validation_types').del()
    .then(async function () {
      // Inserts seed entries
      return knex('validation_types').insert([
        { name: 'email', description: 'Validación de correo electrónico', active: true, created_at: new Date() },
        { name: 'phone', description: 'Validación de teléfono', active: true, created_at: new Date() },
        { name: 'dni', description: 'Validación de documento de identidad', active: true, created_at: new Date() }
      ]);
    });
};
