exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('motives').del()
        .then(function () {
            // Inserts seed entries
            return knex('motives').insert([
                { description: 'Datos incorrectos', userID: null },
                { description: 'Fondos insuficientes', userID: null },
                { description: 'Superado límite de crédito', userID: null },
                { description: 'Producto no disponible', userID: null },
                { description: 'Solicitud duplicada', userID: null }
            ]);
        });
};