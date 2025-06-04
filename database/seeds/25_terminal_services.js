exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('terminals_services').del()
        .then(function () {
            // Inserts seed entries
            return knex('terminals_services').insert([
                // Terminal 1 - 3 services
                { terminalID: 1, serviceID: 1 },
                { terminalID: 1, serviceID: 2 },
                { terminalID: 1, serviceID: 3 },
                
                // Terminal 2 - 4 services
                { terminalID: 2, serviceID: 1 },
                { terminalID: 2, serviceID: 2 },
                { terminalID: 2, serviceID: 3 },
                { terminalID: 2, serviceID: 4 },
                
                // Terminal 3 - 5 services
                { terminalID: 3, serviceID: 1 },
                { terminalID: 3, serviceID: 2 },
                { terminalID: 3, serviceID: 3 },
                { terminalID: 3, serviceID: 4 },
                { terminalID: 3, serviceID: 5 },
                
                // Terminal 4 - 3 services
                { terminalID: 4, serviceID: 1 },
                { terminalID: 4, serviceID: 2 },
                { terminalID: 4, serviceID: 4 },
                
                // Terminal 5 - 4 services
                { terminalID: 5, serviceID: 1 },
                { terminalID: 5, serviceID: 2 },
                { terminalID: 5, serviceID: 3 },
                { terminalID: 5, serviceID: 5 },
                
                // Terminal 6 - 5 services
                { terminalID: 6, serviceID: 1 },
                { terminalID: 6, serviceID: 2 },
                { terminalID: 6, serviceID: 3 },
                { terminalID: 6, serviceID: 4 },
                { terminalID: 6, serviceID: 5 },
                
                // Terminal 7 - 3 services
                { terminalID: 7, serviceID: 1 },
                { terminalID: 7, serviceID: 3 },
                { terminalID: 7, serviceID: 5 },
                
                // Terminal 8 - 4 services
                { terminalID: 8, serviceID: 2 },
                { terminalID: 8, serviceID: 3 },
                { terminalID: 8, serviceID: 4 },
                { terminalID: 8, serviceID: 5 },
                
                // Terminal 9 - 5 services
                { terminalID: 9, serviceID: 1 },
                { terminalID: 9, serviceID: 2 },
                { terminalID: 9, serviceID: 3 },
                { terminalID: 9, serviceID: 4 },
                { terminalID: 9, serviceID: 5 },
                
                // Terminal 10 - 3 services
                { terminalID: 10, serviceID: 1 },
                { terminalID: 10, serviceID: 4 },
                { terminalID: 10, serviceID: 5 },
                
                // Terminal 11 - 4 services
                { terminalID: 11, serviceID: 2 },
                { terminalID: 11, serviceID: 3 },
                { terminalID: 11, serviceID: 4 },
                { terminalID: 11, serviceID: 5 },
                
                // Terminal 12 - 5 services
                { terminalID: 12, serviceID: 1 },
                { terminalID: 12, serviceID: 2 },
                { terminalID: 12, serviceID: 3 },
                { terminalID: 12, serviceID: 4 },
                { terminalID: 12, serviceID: 5 },
                
                // Terminal 13 - 3 services
                { terminalID: 13, serviceID: 1 },
                { terminalID: 13, serviceID: 2 },
                { terminalID: 13, serviceID: 3 },
                
                // Terminal 14 - 4 services
                { terminalID: 14, serviceID: 2 },
                { terminalID: 14, serviceID: 3 },
                { terminalID: 14, serviceID: 4 },
                { terminalID: 14, serviceID: 5 },
                
                // Terminal 15 - 5 services
                { terminalID: 15, serviceID: 1 },
                { terminalID: 15, serviceID: 2 },
                { terminalID: 15, serviceID: 3 },
                { terminalID: 15, serviceID: 4 },
                { terminalID: 15, serviceID: 5 },
                
                // Terminal 16 - 3 services
                { terminalID: 16, serviceID: 1 },
                { terminalID: 16, serviceID: 2 },
                { terminalID: 16, serviceID: 5 },
                
                // Terminal 17 - 4 services
                { terminalID: 17, serviceID: 1 },
                { terminalID: 17, serviceID: 3 },
                { terminalID: 17, serviceID: 4 },
                { terminalID: 17, serviceID: 5 },
                
                // Terminal 18 - 5 services
                { terminalID: 18, serviceID: 1 },
                { terminalID: 18, serviceID: 2 },
                { terminalID: 18, serviceID: 3 },
                { terminalID: 18, serviceID: 4 },
                { terminalID: 18, serviceID: 5 },
                
                // Terminal 19 - 3 services
                { terminalID: 19, serviceID: 2 },
                { terminalID: 19, serviceID: 3 },
                { terminalID: 19, serviceID: 4 },
                
                // Terminal 20 - 4 services
                { terminalID: 20, serviceID: 1 },
                { terminalID: 20, serviceID: 2 },
                { terminalID: 20, serviceID: 4 },
                { terminalID: 20, serviceID: 5 },
                
                // Terminal 21 - 5 services
                { terminalID: 21, serviceID: 1 },
                { terminalID: 21, serviceID: 2 },
                { terminalID: 21, serviceID: 3 },
                { terminalID: 21, serviceID: 4 },
                { terminalID: 21, serviceID: 5 },
                
                // Terminal 22 - 3 services
                { terminalID: 22, serviceID: 2 },
                { terminalID: 22, serviceID: 3 },
                { terminalID: 22, serviceID: 5 },
                
                // Terminal 23 - 4 services
                { terminalID: 23, serviceID: 1 },
                { terminalID: 23, serviceID: 3 },
                { terminalID: 23, serviceID: 4 },
                { terminalID: 23, serviceID: 5 },
                
                // Terminal 24 - 5 services
                { terminalID: 24, serviceID: 1 },
                { terminalID: 24, serviceID: 2 },
                { terminalID: 24, serviceID: 3 },
                { terminalID: 24, serviceID: 4 },
                { terminalID: 24, serviceID: 5 },
                
                // Terminal 25 - 3 services
                { terminalID: 25, serviceID: 2 },
                { terminalID: 25, serviceID: 3 },
                { terminalID: 25, serviceID: 4 },
                
                // Terminal 26 - 4 services
                { terminalID: 26, serviceID: 1 },
                { terminalID: 26, serviceID: 2 },
                { terminalID: 26, serviceID: 3 },
                { terminalID: 26, serviceID: 5 },
                
                // Terminal 27 - 5 services
                { terminalID: 27, serviceID: 1 },
                { terminalID: 27, serviceID: 2 },
                { terminalID: 27, serviceID: 3 },
                { terminalID: 27, serviceID: 4 },
                { terminalID: 27, serviceID: 5 },
                
                // Terminal 28 - 3 services
                { terminalID: 28, serviceID: 1 },
                { terminalID: 28, serviceID: 3 },
                { terminalID: 28, serviceID: 4 },
                
                // Terminal 29 - 4 services
                { terminalID: 29, serviceID: 1 },
                { terminalID: 29, serviceID: 2 },
                { terminalID: 29, serviceID: 3 },
                { terminalID: 29, serviceID: 5 },
                
                // Terminal 30 - 5 services
                { terminalID: 30, serviceID: 1 },
                { terminalID: 30, serviceID: 2 },
                { terminalID: 30, serviceID: 3 },
                { terminalID: 30, serviceID: 4 },
                { terminalID: 30, serviceID: 5 },
                
                // Terminal 31 - 3 services
                { terminalID: 31, serviceID: 2 },
                { terminalID: 31, serviceID: 4 },
                { terminalID: 31, serviceID: 5 },
                
                // Terminal 32 - 4 services
                { terminalID: 32, serviceID: 1 },
                { terminalID: 32, serviceID: 3 },
                { terminalID: 32, serviceID: 4 },
                { terminalID: 32, serviceID: 5 },
                
                // Terminal 33 - 5 services
                { terminalID: 33, serviceID: 1 },
                { terminalID: 33, serviceID: 2 },
                { terminalID: 33, serviceID: 3 },
                { terminalID: 33, serviceID: 4 },
                { terminalID: 33, serviceID: 5 },
                
                // Terminal 34 - 3 services
                { terminalID: 34, serviceID: 1 },
                { terminalID: 34, serviceID: 3 },
                { terminalID: 34, serviceID: 5 },
                
                // Terminal 35 - 4 services
                { terminalID: 35, serviceID: 2 },
                { terminalID: 35, serviceID: 3 },
                { terminalID: 35, serviceID: 4 },
                { terminalID: 35, serviceID: 5 },
                
                // Terminal 36 - 5 services
                { terminalID: 36, serviceID: 1 },
                { terminalID: 36, serviceID: 2 },
                { terminalID: 36, serviceID: 3 },
                { terminalID: 36, serviceID: 4 },
                { terminalID: 36, serviceID: 5 },
                
                // Terminal 37 - 3 services
                { terminalID: 37, serviceID: 1 },
                { terminalID: 37, serviceID: 2 },
                { terminalID: 37, serviceID: 4 },
                
                // Terminal 38 - 4 services
                { terminalID: 38, serviceID: 1 },
                { terminalID: 38, serviceID: 3 },
                { terminalID: 38, serviceID: 4 },
                { terminalID: 38, serviceID: 5 },
                
                // Terminal 39 - 5 services
                { terminalID: 39, serviceID: 1 },
                { terminalID: 39, serviceID: 2 },
                { terminalID: 39, serviceID: 3 },
                { terminalID: 39, serviceID: 4 },
                { terminalID: 39, serviceID: 5 },
                
                // Terminal 40 - 3 services
                { terminalID: 40, serviceID: 2 },
                { terminalID: 40, serviceID: 3 },
                { terminalID: 40, serviceID: 5 },
            ]);
        });
};