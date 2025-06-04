exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('roles_permissions').del()
        .then(function () {
            // Inserts seed entries
            return knex('roles_permissions').insert([
                // Master role permissions
                { roleID: 1, permissionID: 1 },
                { roleID: 1, permissionID: 2 },
                { roleID: 1, permissionID: 3 },
                { roleID: 1, permissionID: 4 },
                { roleID: 1, permissionID: 5 },
                { roleID: 1, permissionID: 6 },
                { roleID: 1, permissionID: 7 },
                { roleID: 1, permissionID: 8 },
                { roleID: 1, permissionID: 9 },
                { roleID: 1, permissionID: 10 },
                { roleID: 1, permissionID: 11 },
                { roleID: 1, permissionID: 12 },
                { roleID: 1, permissionID: 13 },
                { roleID: 1, permissionID: 14 },
                { roleID: 1, permissionID: 15 },
                { roleID: 1, permissionID: 16 },
                { roleID: 1, permissionID: 17 },
                { roleID: 1, permissionID: 18 },

                // Admin role permissions
                { roleID: 2, permissionID: 2 },
                { roleID: 2, permissionID: 3 },
                { roleID: 2, permissionID: 4 },
                { roleID: 2, permissionID: 5 },
                { roleID: 2, permissionID: 6 },
                { roleID: 2, permissionID: 7 },
                { roleID: 2, permissionID: 8 },
                { roleID: 2, permissionID: 9 },
                { roleID: 2, permissionID: 10 },
                { roleID: 2, permissionID: 11 },
                { roleID: 2, permissionID: 12 },
                { roleID: 2, permissionID: 13 },
                { roleID: 2, permissionID: 14 },
                { roleID: 2, permissionID: 15 },
                { roleID: 2, permissionID: 16 },

                // Gerente role permissions
                { roleID: 3, permissionID: 2 },
                { roleID: 3, permissionID: 3 },
                { roleID: 3, permissionID: 4 },
                { roleID: 3, permissionID: 5 },
                { roleID: 3, permissionID: 6 },
                { roleID: 3, permissionID: 7 },
                { roleID: 3, permissionID: 8 },
                { roleID: 3, permissionID: 9 },
                { roleID: 3, permissionID: 10 },
                { roleID: 3, permissionID: 11 },

                // Comercio role permissions
                { roleID: 4, permissionID: 12 },
                { roleID: 4, permissionID: 13 },
                { roleID: 4, permissionID: 14 }
            ]);
        });
};