exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('states').del()
        .then(function () {
            // Inserts seed entries
            return knex('states').insert([
                { state: 'Amazonas', ISO_3166_2: 'VE-X', CountryID: 1 },
                { state: 'Anzoátegui', ISO_3166_2: 'VE-B', CountryID: 1 },
                { state: 'Apure', ISO_3166_2: 'VE-C', CountryID: 1 },
                { state: 'Aragua', ISO_3166_2: 'VE-D', CountryID: 1 },
                { state: 'Barinas', ISO_3166_2: 'VE-E', CountryID: 1 },
                { state: 'Bolívar', ISO_3166_2: 'VE-F', CountryID: 1 },
                { state: 'Carabobo', ISO_3166_2: 'VE-G', CountryID: 1 },
                { state: 'Cojedes', ISO_3166_2: 'VE-H', CountryID: 1 },
                { state: 'Delta Amacuro', ISO_3166_2: 'VE-Y', CountryID: 1 },
                { state: 'Falcón', ISO_3166_2: 'VE-I', CountryID: 1 },
                { state: 'Guárico', ISO_3166_2: 'VE-J', CountryID: 1 },
                { state: 'Lara', ISO_3166_2: 'VE-K', CountryID: 1 },
                { state: 'Mérida', ISO_3166_2: 'VE-L', CountryID: 1 },
                { state: 'Miranda', ISO_3166_2: 'VE-M', CountryID: 1 },
                { state: 'Monagas', ISO_3166_2: 'VE-N', CountryID: 1 },
                { state: 'Nueva Esparta', ISO_3166_2: 'VE-O', CountryID: 1 },
                { state: 'Portuguesa', ISO_3166_2: 'VE-P', CountryID: 1 },
                { state: 'Sucre', ISO_3166_2: 'VE-R', CountryID: 1 },
                { state: 'Táchira', ISO_3166_2: 'VE-S', CountryID: 1 },
                { state: 'Trujillo', ISO_3166_2: 'VE-T', CountryID: 1 },
                { state: 'Vargas', ISO_3166_2: 'VE-W', CountryID: 1 },
                { state: 'Yaracuy', ISO_3166_2: 'VE-U', CountryID: 1 },
                { state: 'Zulia', ISO_3166_2: 'VE-V', CountryID: 1 },
                { state: 'Distrito Capital', ISO_3166_2: 'VE-A', CountryID: 1 },
                { state: 'Dependencias Federales', ISO_3166_2: 'VE-Z', CountryID: 1 }
            ]);
        });
};