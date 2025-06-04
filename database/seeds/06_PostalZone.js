exports.seed = function(knex) {
    return knex('postal_zones').del()
        .then(function() {
            return knex('postal_zones').insert([
                // Distrito Capital
                { Postal_Code: '1010', Town: 'Altagracia', ParishID: 1 },
                { Postal_Code: '1030', Town: '23 de Enero', ParishID: 21 },
                { Postal_Code: '1021', Town: 'La Vega', ParishID: 12 },
                { Postal_Code: '1014', Town: 'Coche', ParishID: 5 },
                { Postal_Code: '1025', Town: 'San Juan', ParishID: 17 },
                { Postal_Code: '1031', Town: 'Sucre', ParishID: 22 },
                { Postal_Code: '1012', Town: 'Caricuao', ParishID: 3 },
                { Postal_Code: '1016', Town: 'El Paraíso', ParishID: 7 },
                { Postal_Code: '1013', Town: 'Catedral', ParishID: 4 },
                { Postal_Code: '1011', Town: 'Antímano', ParishID: 2 },
                { Postal_Code: '1018', Town: 'El Valle', ParishID: 9 },
                { Postal_Code: '1023', Town: 'San Agustín', ParishID: 14 },
                { Postal_Code: '1020', Town: 'La Pastora', ParishID: 11 },
                { Postal_Code: '1022', Town: 'Macarao', ParishID: 13 },
                { Postal_Code: '1017', Town: 'El Recreo', ParishID: 8 },
                { Postal_Code: '1015', Town: 'El Junquito', ParishID: 6 },
                { Postal_Code: '1024', Town: 'San Bernardino', ParishID: 15 },
                { Postal_Code: '1019', Town: 'La Candelaria', ParishID: 10 },
                { Postal_Code: '1027', Town: 'San Pedro', ParishID: 18 },
                { Postal_Code: '1028', Town: 'Santa Rosalía', ParishID: 19 },
                { Postal_Code: '1029', Town: 'Santa Teresa', ParishID: 20 },
                { Postal_Code: '1026', Town: 'San José', ParishID: 16 },

                // Miranda
                { Postal_Code: '1060', Town: 'Chacao', ParishID: 23 },
                { Postal_Code: '1080', Town: 'Baruta', ParishID: 24 },
                { Postal_Code: '1083', Town: 'El Hatillo', ParishID: 25 },
                { Postal_Code: '1073', Town: 'Leoncio Martínez', ParishID: 26 },
                { Postal_Code: '1070', Town: 'Petare', ParishID: 27 },
                { Postal_Code: '1071', Town: 'Caucagüita', ParishID: 28 },
                { Postal_Code: '1072', Town: 'Filas de Mariche', ParishID: 29 },
                { Postal_Code: '1074', Town: 'La Dolorita', ParishID: 30 },

                // Anzoátegui
                { Postal_Code: '6001', Town: 'Barcelona', ParishID: 31 },
                { Postal_Code: '6023', Town: 'Puerto La Cruz', ParishID: 32 },
                { Postal_Code: '6016', Town: 'Lechería', ParishID: 33 },
                { Postal_Code: '6015', Town: 'Guanta', ParishID: 34 },
                { Postal_Code: '6050', Town: 'El Tigre', ParishID: 35 },
                { Postal_Code: '6003', Town: 'Anaco', ParishID: 36 },
                { Postal_Code: '6007', Town: 'Cantaura', ParishID: 37 },
                { Postal_Code: '6017', Town: 'San Mateo', ParishID: 38 },
                { Postal_Code: '6018', Town: 'Clarines', ParishID: 39 },

                // Apure
                { Postal_Code: '7001', Town: 'San Fernando de Apure', ParishID: 40 },
                { Postal_Code: '7002', Town: 'Achaguas', ParishID: 41 },
                { Postal_Code: '7011', Town: 'Biruaca', ParishID: 42 },
                { Postal_Code: '7023', Town: 'Guasdualito', ParishID: 43 },
                { Postal_Code: '7021', Town: 'Bruzual', ParishID: 44 },
                { Postal_Code: '7025', Town: 'El Nula', ParishID: 45 },

                // Aragua
                { Postal_Code: '2101', Town: 'Maracay', ParishID: 46 },
                { Postal_Code: '2115', Town: 'Turmero', ParishID: 47 },
                { Postal_Code: '2121', Town: 'La Victoria', ParishID: 48 },
                { Postal_Code: '2122', Town: 'Cagua', ParishID: 49 },
                { Postal_Code: '2126', Town: 'Villa de Cura', ParishID: 50 },
                { Postal_Code: '2125', Town: 'San Mateo', ParishID: 51 },
                { Postal_Code: '2128', Town: 'El Consejo', ParishID: 52 },
                { Postal_Code: '2129', Town: 'Santa Cruz', ParishID: 53 },

                // Barinas
                { Postal_Code: '5201', Town: 'Barinas', ParishID: 54 },
                { Postal_Code: '5216', Town: 'Santa Bárbara', ParishID: 55 },
                { Postal_Code: '5224', Town: 'Socopó', ParishID: 56 },
                { Postal_Code: '5202', Town: 'Barinitas', ParishID: 57 },
                { Postal_Code: '5210', Town: 'Sabaneta', ParishID: 58 },

                // Bolívar
                { Postal_Code: '8001', Town: 'Ciudad Bolívar', ParishID: 59 },
                { Postal_Code: '8050', Town: 'Ciudad Guayana', ParishID: 60 },
                { Postal_Code: '8011', Town: 'Upata', ParishID: 61 },
                { Postal_Code: '8031', Town: 'Tumeremo', ParishID: 62 },
                { Postal_Code: '8023', Town: 'Caicara del Orinoco', ParishID: 63 },

                // Carabobo
                { Postal_Code: '2001', Town: 'Valencia', ParishID: 64 },
                { Postal_Code: '2011', Town: 'Puerto Cabello', ParishID: 65 },
                { Postal_Code: '2003', Town: 'Guacara', ParishID: 66 },
                { Postal_Code: '2004', Town: 'Mariara', ParishID: 67 },
                { Postal_Code: '2006', Town: 'Tocuyito', ParishID: 68 },

                // Cojedes
                { Postal_Code: '2201', Town: 'San Carlos', ParishID: 69 },
                { Postal_Code: '2216', Town: 'Tinaquillo', ParishID: 70 },
                { Postal_Code: '2209', Town: 'Tinaco', ParishID: 71 },
                { Postal_Code: '2205', Town: 'El Baúl', ParishID: 72 },
                { Postal_Code: '2214', Town: 'Macapo', ParishID: 73 },

                // Falcón
                { Postal_Code: '4101', Town: 'Coro', ParishID: 74 },
                { Postal_Code: '4102', Town: 'Punto Fijo', ParishID: 75 },
                { Postal_Code: '4121', Town: 'Churuguara', ParishID: 76 },
                { Postal_Code: '4125', Town: 'Tucacas', ParishID: 77 },
                { Postal_Code: '4126', Town: 'Mirimire', ParishID: 78 },

                // Guárico
                { Postal_Code: '2301', Town: 'San Juan de Los Morros', ParishID: 79 },
                { Postal_Code: '2312', Town: 'Valle de La Pascua', ParishID: 80 },
                { Postal_Code: '2302', Town: 'Altagracia de Orituco', ParishID: 81 },
                { Postal_Code: '2303', Town: 'Calabozo', ParishID: 82 },
                { Postal_Code: '2304', Town: 'San José de Guaribe', ParishID: 83 },

                // Lara
                { Postal_Code: '3001', Town: 'Barquisimeto', ParishID: 84 },
                { Postal_Code: '3011', Town: 'Carora', ParishID: 85 },
                { Postal_Code: '3013', Town: 'El Tocuyo', ParishID: 86 },
                { Postal_Code: '3014', Town: 'Quíbor', ParishID: 87 },
                { Postal_Code: '3015', Town: 'Duaca', ParishID: 88 },

                // Mérida
                { Postal_Code: '5101', Town: 'Mérida', ParishID: 89 },
                { Postal_Code: '5107', Town: 'Tovar', ParishID: 90 },
                { Postal_Code: '5116', Town: 'Ejido', ParishID: 91 },
                { Postal_Code: '5126', Town: 'Santa Cruz de Mora', ParishID: 92 },

                // Nueva Esparta
                { Postal_Code: '6301', Town: 'Porlamar', ParishID: 93 },
                { Postal_Code: '6311', Town: 'La Asunción', ParishID: 94 },
                { Postal_Code: '6316', Town: 'Juan Griego', ParishID: 95 },
                { Postal_Code: '6320', Town: 'Pampatar', ParishID: 96 },
                { Postal_Code: '6324', Town: 'San Juan Bautista', ParishID: 97 },

                // Portuguesa
                { Postal_Code: '3350', Town: 'Guanare', ParishID: 98 },
                { Postal_Code: '3351', Town: 'Acarigua', ParishID: 99 },
                { Postal_Code: '3353', Town: 'Araure', ParishID: 100 },
                { Postal_Code: '3355', Town: 'Píritu', ParishID: 101 },
                { Postal_Code: '3357', Town: 'Biscucuy', ParishID: 102 },

                // Sucre
                { Postal_Code: '6101', Town: 'Cumaná', ParishID: 103 },
                { Postal_Code: '6102', Town: 'Carúpano', ParishID: 104 },
                { Postal_Code: '6150', Town: 'Güiria', ParishID: 105 },
                { Postal_Code: '6160', Town: 'Río Caribe', ParishID: 106 },
                { Postal_Code: '6170', Town: 'San Antonio del Golfo', ParishID: 107 },

                // Táchira
                { Postal_Code: '5001', Town: 'San Cristóbal', ParishID: 108 },
                { Postal_Code: '5030', Town: 'Rubio', ParishID: 109 },
                { Postal_Code: '5035', Town: 'San Antonio del Táchira', ParishID: 110 },
                { Postal_Code: '5041', Town: 'La Fría', ParishID: 111 },
                { Postal_Code: '5048', Town: 'Colón', ParishID: 112 },

                // Vargas
                { Postal_Code: '1160', Town: 'La Guaira', ParishID: 113 },
                { Postal_Code: '1161', Town: 'Macuto', ParishID: 114 },
                { Postal_Code: '1162', Town: 'Caraballeda', ParishID: 115 },
                { Postal_Code: '1163', Town: 'Maiquetía', ParishID: 116 },
                { Postal_Code: '1164', Town: 'Catia La Mar', ParishID: 117 },

                // Yaracuy
                { Postal_Code: '3201', Town: 'San Felipe', ParishID: 118 },
                { Postal_Code: '3203', Town: 'Yaritagua', ParishID: 119 },
                { Postal_Code: '3202', Town: 'Chivacoa', ParishID: 120 },
                { Postal_Code: '3204', Town: 'Nirgua', ParishID: 121 },
                { Postal_Code: '3205', Town: 'Aroa', ParishID: 122 },

                // Monagas
                { Postal_Code: '6201', Town: 'Maturín', ParishID: 123 },
                { Postal_Code: '6202', Town: 'Caripito', ParishID: 124 },
                { Postal_Code: '6203', Town: 'Punta de Mata', ParishID: 125 },
                { Postal_Code: '6204', Town: 'Temblador', ParishID: 126 },
                { Postal_Code: '6205', Town: 'Caripe', ParishID: 127 },
                
                // Trujillo
                { Postal_Code: '3101', Town: 'Trujillo', ParishID: 128 },
                { Postal_Code: '3102', Town: 'Valera', ParishID: 129 },
                { Postal_Code: '3103', Town: 'Boconó', ParishID: 130 },
                { Postal_Code: '3104', Town: 'Carache', ParishID: 131 },
                { Postal_Code: '3105', Town: 'Escuque', ParishID: 132 },
            ]);
        });
};