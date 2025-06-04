exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users_terminals').del()
        .then(function () {
            // Inserts seed entries
            return knex('users_terminals').insert([
                // Assign 20 terminals to user 1
                { userID: 1, terminalID: 1 },
                { userID: 1, terminalID: 2 },
                { userID: 1, terminalID: 3 },
                { userID: 1, terminalID: 4 },
                { userID: 1, terminalID: 5 },
                { userID: 1, terminalID: 6 },
                { userID: 1, terminalID: 7 },
                { userID: 1, terminalID: 8 },
                { userID: 1, terminalID: 9 },
                { userID: 1, terminalID: 10 },
                { userID: 1, terminalID: 11 },
                { userID: 1, terminalID: 12 },
                { userID: 1, terminalID: 13 },
                { userID: 1, terminalID: 14 },
                { userID: 1, terminalID: 15 },
                { userID: 1, terminalID: 16 },
                { userID: 1, terminalID: 17 },
                { userID: 1, terminalID: 18 },
                { userID: 1, terminalID: 19 },
                { userID: 1, terminalID: 20 },

                // Assign 20 terminals to user 2
                { userID: 2, terminalID: 21 },
                { userID: 2, terminalID: 22 },
                { userID: 2, terminalID: 23 },
                { userID: 2, terminalID: 24 },
                { userID: 2, terminalID: 25 },
                { userID: 2, terminalID: 26 },
                { userID: 2, terminalID: 27 },
                { userID: 2, terminalID: 28 },
                { userID: 2, terminalID: 29 },
                { userID: 2, terminalID: 30 },
                { userID: 2, terminalID: 31 },
                { userID: 2, terminalID: 32 },
                { userID: 2, terminalID: 33 },
                { userID: 2, terminalID: 34 },
                { userID: 2, terminalID: 35 },
                { userID: 2, terminalID: 36 },
                { userID: 2, terminalID: 37 },
                { userID: 2, terminalID: 38 },
                { userID: 2, terminalID: 39 },
                { userID: 2, terminalID: 40 }
            ]);
        });
};