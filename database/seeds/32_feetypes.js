exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('feetypes').del()
        .then(function () {
            // Inserts seed entries
            return knex('feetypes').insert([
                {
                    description: 'Cliente Fijo',
                    amount: 1.5,
                    active: true,
                    userID: null
                },
                {
                    description: 'Promoción',
                    amount: 0.5,
                    active: true,
                    userID: null
                },
                {
                    description: 'Cliente Nuevo',
                    amount: 1.8,
                    active: true,
                    userID: null
                },
                {
                    description: 'Descuento por Volumen',
                    amount: 1.2,
                    active: true,
                    userID: null
                },
                {
                    description: 'Tarifa de Referido',
                    amount: 1.0,
                    active: true,
                    userID: null
                },
                {
                    description: 'Tarifa Especial',
                    amount: 2.0,
                    active: true,
                    userID: null
                }
            ]);
        });
};