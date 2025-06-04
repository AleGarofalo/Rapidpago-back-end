exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cities').del()
        .then(function () {
            // Inserts seed entries
            return knex('cities').insert([
                // Amazonas
                { City: 'Puerto Ayacucho', Capital: true, StateID: 1 },
                { City: 'San Fernando de Atabapo', Capital: false, StateID: 1 },
                { City: 'Maroa', Capital: false, StateID: 1 },
                { City: 'La Esmeralda', Capital: false, StateID: 1 },
                // Anzoátegui
                { City: 'Barcelona', Capital: true, StateID: 2 },
                { City: 'Puerto La Cruz', Capital: false, StateID: 2 },
                { City: 'El Tigre', Capital: false, StateID: 2 },
                { City: 'Anaco', Capital: false, StateID: 2 },
                { City: 'Lechería', Capital: false, StateID: 2 },
                { City: 'Cantaura', Capital: false, StateID: 2 },
                // Apure
                { City: 'San Fernando de Apure', Capital: true, StateID: 3 },
                { City: 'Achaguas', Capital: false, StateID: 3 },
                { City: 'Biruaca', Capital: false, StateID: 3 },
                { City: 'Guasdualito', Capital: false, StateID: 3 },
                // Aragua
                { City: 'Maracay', Capital: true, StateID: 4 },
                { City: 'Turmero', Capital: false, StateID: 4 },
                { City: 'La Victoria', Capital: false, StateID: 4 },
                { City: 'El Limón', Capital: false, StateID: 4 },
                { City: 'Cagua', Capital: false, StateID: 4 },
                // Barinas
                { City: 'Barinas', Capital: true, StateID: 5 },
                { City: 'Barinitas', Capital: false, StateID: 5 },
                { City: 'Sabaneta', Capital: false, StateID: 5 },
                { City: 'Socopó', Capital: false, StateID: 5 },
                // Bolívar
                { City: 'Ciudad Bolívar', Capital: true, StateID: 6 },
                { City: 'Ciudad Guayana', Capital: false, StateID: 6 },
                { City: 'Upata', Capital: false, StateID: 6 },
                { City: 'Tumeremo', Capital: false, StateID: 6 },
                { City: 'El Callao', Capital: false, StateID: 6 },
                { City: 'Caicara del Orinoco', Capital: false, StateID: 6 },
                // Carabobo
                { City: 'Valencia', Capital: true, StateID: 7 },
                { City: 'Puerto Cabello', Capital: false, StateID: 7 },
                { City: 'Guacara', Capital: false, StateID: 7 },
                { City: 'Mariara', Capital: false, StateID: 7 },
                { City: 'Bejuma', Capital: false, StateID: 7 },
                { City: 'Morón', Capital: false, StateID: 7 },
                { City: 'San Joaquín', Capital: false, StateID: 7 },
                // Cojedes
                { City: 'San Carlos', Capital: true, StateID: 8 },
                { City: 'Tinaquillo', Capital: false, StateID: 8 },
                { City: 'El Baúl', Capital: false, StateID: 8 },
                // Delta Amacuro
                { City: 'Tucupita', Capital: true, StateID: 9 },
                { City: 'Pedernales', Capital: false, StateID: 9 },
                { City: 'Curiapo', Capital: false, StateID: 9 },
                // Falcón
                { City: 'Coro', Capital: true, StateID: 10 },
                { City: 'Punto Fijo', Capital: false, StateID: 10 },
                { City: 'Santa Ana de Coro', Capital: false, StateID: 10 },
                { City: 'Churuguara', Capital: false, StateID: 10 },
                // Guárico
                { City: 'San Juan de los Morros', Capital: true, StateID: 11 },
                { City: 'Valle de la Pascua', Capital: false, StateID: 11 },
                { City: 'Calabozo', Capital: false, StateID: 11 },
                { City: 'Tucupido', Capital: false, StateID: 11 },
                { City: 'San José de Guaribe', Capital: false, StateID: 11 },
                // Lara
                { City: 'Barquisimeto', Capital: true, StateID: 12 },
                { City: 'Cabudare', Capital: false, StateID: 12 },
                { City: 'Carora', Capital: false, StateID: 12 },
                { City: 'El Tocuyo', Capital: false, StateID: 12 },
                { City: 'Quíbor', Capital: false, StateID: 12 },
                // Mérida
                { City: 'Mérida', Capital: true, StateID: 13 },
                { City: 'El Vigía', Capital: false, StateID: 13 },
                { City: 'Ejido', Capital: false, StateID: 13 },
                { City: 'Tovar', Capital: false, StateID: 13 },
                { City: 'Bailadores', Capital: false, StateID: 13 },
                // Miranda
                { City: 'Los Teques', Capital: true, StateID: 14 },
                { City: 'Guatire', Capital: false, StateID: 14 },
                { City: 'Guarenas', Capital: false, StateID: 14 },
                { City: 'Higuerote', Capital: false, StateID: 14 },
                { City: 'Ocumare del Tuy', Capital: false, StateID: 14 },
                { City: 'Santa Teresa del Tuy', Capital: false, StateID: 14 },
                { City: 'Charallave', Capital: false, StateID: 14 },
                { City: 'San Antonio de los Altos', Capital: false, StateID: 14 },
                // Monagas
                { City: 'Maturín', Capital: true, StateID: 15 },
                { City: 'Caripito', Capital: false, StateID: 15 },
                { City: 'Punta de Mata', Capital: false, StateID: 15 },
                { City: 'Quiriquire', Capital: false, StateID: 15 },
                // Nueva Esparta
                { City: 'La Asunción', Capital: true, StateID: 16 },
                { City: 'Porlamar', Capital: false, StateID: 16 },
                { City: 'Juan Griego', Capital: false, StateID: 16 },
                { City: 'Pampatar', Capital: false, StateID: 16 },
                // Portuguesa
                { City: 'Guanare', Capital: true, StateID: 17 },
                { City: 'Acarigua', Capital: false, StateID: 17 },
                { City: 'Araure', Capital: false, StateID: 17 },
                { City: 'Biscucuy', Capital: false, StateID: 17 },
                { City: 'Guanarito', Capital: false, StateID: 17 },
                // Sucre
                { City: 'Cumaná', Capital: true, StateID: 18 },
                { City: 'Carúpano', Capital: false, StateID: 18 },
                { City: 'Güiria', Capital: false, StateID: 18 },
                { City: 'Río Caribe', Capital: false, StateID: 18 },
                // Táchira
                { City: 'San Cristóbal', Capital: true, StateID: 19 },
                { City: 'Táriba', Capital: false, StateID: 19 },
                { City: 'Rubio', Capital: false, StateID: 19 },
                { City: 'San Antonio del Táchira', Capital: false, StateID: 19 },
                { City: 'La Grita', Capital: false, StateID: 19 },
                { City: 'Ureña', Capital: false, StateID: 19 },
                { City: 'Colón', Capital: false, StateID: 19 },
                // Trujillo
                { City: 'Trujillo', Capital: true, StateID: 20 },
                { City: 'Valera', Capital: false, StateID: 20 },
                { City: 'Boconó', Capital: false, StateID: 20 },
                { City: 'Sabana de Mendoza', Capital: false, StateID: 20 },
                { City: 'Carvajal', Capital: false, StateID: 20 },
                // Vargas
                { City: 'La Guaira', Capital: true, StateID: 21 },
                { City: 'Maiquetía', Capital: false, StateID: 21 },
                { City: 'Catia La Mar', Capital: false, StateID: 21 },
                // Yaracuy
                { City: 'San Felipe', Capital: true, StateID: 22 },
                { City: 'Yaritagua', Capital: false, StateID: 22 },
                { City: 'Chivacoa', Capital: false, StateID: 22 },
                // Zulia
                { City: 'Maracaibo', Capital: true, StateID: 23 },
                { City: 'Cabimas', Capital: false, StateID: 23 },
                { City: 'Ciudad Ojeda', Capital: false, StateID: 23 },
                { City: 'Machiques', Capital: false, StateID: 23 },
                { City: 'Santa Bárbara del Zulia', Capital: false, StateID: 23 },
                { City: 'Mara', Capital: false, StateID: 23 },
                { City: 'San Carlos del Zulia', Capital: false, StateID: 23 },
                { City: 'La Concepción', Capital: false, StateID: 23 },
                // Distrito Capital
                { City: 'Caracas', Capital: true, StateID: 24 },
                // Dependencias Federales
                { City: 'Gran Roque', Capital: false, StateID: 25 }
                // Otros estados pueden ser añadidos aquí...
            ]);
        });
};