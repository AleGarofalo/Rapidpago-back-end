exports.seed = function(knex) {
    // Eliminar todos los registros existentes en la tabla Sector
    return knex('sectors').del()
        .then(function() {
            // Insertar los datos en la tabla Sector
            return knex('sectors').insert([
                { Sector: 'Servicios sin fines de lucro' },
                { Sector: 'Alimentos' },
                { Sector: 'Servicios publicos basicos' },
                { Sector: 'Salud' },
                { Sector: 'Educacion' },
                { Sector: 'Vestido y calzado' },
                { Sector: 'Equipamiento del hogar' },
                { Sector: 'Entretenimiento' },
                { Sector: 'Bienes y servicios financieros' },
                { Sector: 'Bienes y servicios suntuarios' }
            ]);
        });
};