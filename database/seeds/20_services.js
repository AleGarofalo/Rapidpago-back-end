exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('services').del()
        .then(function () {
            // Inserts seed entries
            return knex('services').insert([
                {
                    service: 'C2P',
                    description: 'Descripción del servicio 1',
                    active: true,
                    ispos: false
                },
                {
                    service: 'B2P',
                    description: 'Descripción del servicio 2',
                    active: true,
                    ispos: false
                },
                {
                    service: 'RECARGAS',
                    description: 'Descripción del servicio 3',
                    active: true,
                    ispos: false
                },
                {
                    service: 'PAGO DE SERVICIO',
                    description: 'Descripción del servicio 4',
                    active: true,
                    ispos: false
                },
                {
                    service: 'PUNTO DE VENTA',
                    description: 'Descripción del servicio 5',
                    active: true,
                    ispos: false
                },
                {
                    service: 'BOTON DE PAGO',
                    description: 'Descripción del servicio 6',
                    active: true,
                    ispos: false
                },
                {
                    service: 'QR',
                    description: 'Descripción del servicio 7',
                    active: true,
                    ispos: false
                },
                {
                    service: 'CI',
                    description: 'Descripción del servicio 8',
                    active: true,
                    ispos: false
                },
                {
                    service: 'DI',
                    description: 'Descripción del servicio 9',
                    active: true,
                    ispos: false
                },
                {
                    service: 'Service 10',
                    description: 'Descripción del servicio 10',
                    active: true,
                    ispos: false
                }
            ]);
        });
};