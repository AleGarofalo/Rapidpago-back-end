exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('currencies').del()
        .then(function () {
            // Inserts seed entries
            return knex('currencies').insert([
                {
                    name: 'Bolívar',
                    symbol: 'VES',
                    exchange_rate: 1, // El bolívar es la referencia, por lo tanto, la tasa de cambio es 1
                    userID: null
                },
                {
                    name: 'Dólar',
                    symbol: 'USD',
                    exchange_rate: 36.64, // Ejemplo de tasa de cambio del Banco Central de Venezuela
                    userID: null
                },
                {
                    name: 'Euro',
                    symbol: 'EUR',
                    exchange_rate: 46.27, // Ejemplo de tasa de cambio del Banco Central de Venezuela
                    userID: null
                }
            ]);
        });
};