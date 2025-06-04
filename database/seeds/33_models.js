exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('models').del()
        .then(function () {
            // Inserts seed entries
            return knex('models').insert([
                { name: 'F20', brand: 'FEITIAN'  },
                { name: 'F300', brand: 'FEITIAN'  },
                { name: 'F310', brand: 'FEITIAN'  },
                { name: 'F600', brand: 'FEITIAN' },
                { name: 'P2', brand: 'SUNMI' },
                { name: 'P2 Mini', brand: 'SUNMI' },
                { name: 'P2 LITE', brand: 'SUNMI' },
                { name: 'P2 PRO', brand: 'SUNMI' },
                { name: 'WISEPAD 2', brand: 'BBPOS' },
                { name: 'WISEPAD 2 PLUS', brand: 'BBPOS' }
            ]);
        });
};