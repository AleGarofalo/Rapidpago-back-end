exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('countries').del()
        .then(function () {
            // Inserts seed entries
            return knex('countries').insert([
                /*
                { Country: 'Argentina', ISO_3166_1: 'AR', ISO_3166_2: 'ARG', ISO_3166_Num: '032' },
                { Country: 'Bolivia', ISO_3166_1: 'BO', ISO_3166_2: 'BOL', ISO_3166_Num: '068' },
                { Country: 'Brazil', ISO_3166_1: 'BR', ISO_3166_2: 'BRA', ISO_3166_Num: '076' },
                { Country: 'Chile', ISO_3166_1: 'CL', ISO_3166_2: 'CHL', ISO_3166_Num: '152' },
                { Country: 'Colombia', ISO_3166_1: 'CO', ISO_3166_2: 'COL', ISO_3166_Num: '170' },
                { Country: 'Ecuador', ISO_3166_1: 'EC', ISO_3166_2: 'ECU', ISO_3166_Num: '218' },
                { Country: 'Guyana', ISO_3166_1: 'GY', ISO_3166_2: 'GUY', ISO_3166_Num: '328' },
                { Country: 'Paraguay', ISO_3166_1: 'PY', ISO_3166_2: 'PRY', ISO_3166_Num: '600' },
                { Country: 'Peru', ISO_3166_1: 'PE', ISO_3166_2: 'PER', ISO_3166_Num: '604' },
                { Country: 'Suriname', ISO_3166_1: 'SR', ISO_3166_2: 'SUR', ISO_3166_Num: '740' },
                { Country: 'Uruguay', ISO_3166_1: 'UY', ISO_3166_2: 'URY', ISO_3166_Num: '858' },
                */
                { country: 'Venezuela', ISO_3166_1: 'VE', ISO_3166_2: 'VEN', ISO_3166_Num: '862' ,userID: null}
            ]);
        });
};