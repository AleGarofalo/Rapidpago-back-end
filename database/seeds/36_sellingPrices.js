exports.seed = function(knex) {
    // Primero, eliminamos las entradas existentes en la tabla
    return knex('sellingprices').del()
        .then(function() {
            // Inserción de datos en la tabla sellingprices
            const prices = [];

            // Definimos precios para cada modelo y moneda
            const modelPrices = {
                1: { 1: 1000, 2: 5, 3: 4.5 }, // Modelo 1: Precio en bolívares, dólares, euros
                2: { 1: 1200, 2: 6, 3: 5.4 }, // Modelo 2
                3: { 1: 1400, 2: 7, 3: 6.3 }, // Modelo 3
                4: { 1: 1600, 2: 8, 3: 7.2 }, // Modelo 4
                5: { 1: 1800, 2: 9, 3: 8.1 }, // Modelo 5
                6: { 1: 2000, 2: 10, 3: 9 },   // Modelo 6
                7: { 1: 2200, 2: 11, 3: 9.9 }, // Modelo 7
                8: { 1: 2400, 2: 12, 3: 10.8 }, // Modelo 8
                9: { 1: 2600, 2: 13, 3: 11.7 }, // Modelo 9
                10: { 1: 2800, 2: 14, 3: 12.6 } // Modelo 10
            };

            // Obtener la fecha de hoy
            const today = new Date().toISOString().split('T')[0] + ' 00:00:00';

            // Recorremos cada modelo y cada moneda para crear los precios
            for (let modelID = 1; modelID <= 10; modelID++) {
                for (let currencyID = 1; currencyID <= 3; currencyID++) {
                    prices.push({
                        amount: modelPrices[modelID][currencyID],
                        active: true,
                        pricedate: today,
                        userID: 1,
                        currencyID: currencyID,
                        modelID: modelID,
                    });
                }
            }

            // Insertar los precios en la tabla
            return knex('sellingprices').insert(prices);
        });
};