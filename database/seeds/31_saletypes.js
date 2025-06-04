
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('saletypes').del()
        .then(function () {
            // Inserts seed entries
            return knex('saletypes').insert([
                { description: 'Contado', userID: null },
                { description: 'Financiado', userID: null },
                { description: 'Alquilado', userID: null },
                { description: 'Comodato', userID: null },
                { description: 'Preferencial', userID: null },
                { description: 'Cashea', userID: null }
            ]);
        });
};