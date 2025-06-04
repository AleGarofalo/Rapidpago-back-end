exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('services_settings').del()
        .then(function () {
            // Inserts seed entries
            return knex('services_settings').insert([
                {
                    serviceID: 1,
                    userID: 3,
                    terminalID: 3,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 3,
                    terminalID: 4,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 4
                {
                    serviceID: 1,
                    userID: 4,
                    terminalID: 5,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 4,
                    terminalID: 6,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 5
                {
                    serviceID: 1,
                    userID: 5,
                    terminalID: 7,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 5,
                    terminalID: 8,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 6
                {
                    serviceID: 1,
                    userID: 6,
                    terminalID: 9,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 6,
                    terminalID: 10,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 7
                {
                    serviceID: 1,
                    userID: 7,
                    terminalID: 11,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 7,
                    terminalID: 12,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 8
                {
                    serviceID: 1,
                    userID: 8,
                    terminalID: 13,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 8,
                    terminalID: 14,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 9
                {
                    serviceID: 1,
                    userID: 9,
                    terminalID: 15,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 9,
                    terminalID: 16,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 10
                {
                    serviceID: 1,
                    userID: 10,
                    terminalID: 17,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 10,
                    terminalID: 18,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 11
                {
                    serviceID: 1,
                    userID: 11,
                    terminalID: 19,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 11,
                    terminalID: 20,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 12
                {
                    serviceID: 1,
                    userID: 12,
                    terminalID: 21,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 12,
                    terminalID: 22,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Continuar hasta 22 inserciones...
                // Usuario 13
                {
                    serviceID: 1,
                    userID: 13,
                    terminalID: 1,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 13,
                    terminalID: 2,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 14
                {
                    serviceID: 1,
                    userID: 14,
                    terminalID: 3,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 14,
                    terminalID: 4,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 15
                {
                    serviceID: 1,
                    userID: 15,
                    terminalID: 5,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 15,
                    terminalID: 6,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 16
                {
                    serviceID: 1,
                    userID: 16,
                    terminalID: 7,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 16,
                    terminalID: 8,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 17
                {
                    serviceID: 1,
                    userID: 17,
                    terminalID: 9,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 17,
                    terminalID: 10,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 18
                {
                    serviceID: 1,
                    userID: 18,
                    terminalID: 11,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 18,
                    terminalID: 12,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 19
                {
                    serviceID: 1,
                    userID: 19,
                    terminalID: 13,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 19,
                    terminalID: 14,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 20
                {
                    serviceID: 1,
                    userID: 20,
                    terminalID: 15,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 20,
                    terminalID: 16,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 21
                {
                    serviceID: 1,
                    userID: 21,
                    terminalID: 17,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 21,
                    terminalID: 18,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                // Usuario 22
                {
                    serviceID: 1,
                    userID: 22,
                    terminalID: 19,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 22,
                    terminalID: 20,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 1,
                    userID: 23,
                    terminalID: 23,
                    bankID: 1,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 23,
                    terminalID: 24,
                    bankID: 2,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 3,
                    userID: 23,
                    terminalID: 25,
                    bankID: 3,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 4,
                    userID: 23,
                    terminalID: 26,
                    bankID: 4,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 5,
                    userID: 23,
                    terminalID: 27,
                    bankID: 5,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 6,
                    userID: 23,
                    terminalID: 28,
                    bankID: 6,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 7,
                    userID: 23,
                    terminalID: 29,
                    bankID: 7,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 8,
                    userID: 23,
                    terminalID: 30,
                    bankID: 8,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 9,
                    userID: 23,
                    terminalID: 1,
                    bankID: 9,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 10,
                    userID: 23,
                    terminalID: 2,
                    bankID: 10,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 1,
                    userID: 24,
                    terminalID: 3,
                    bankID: 11,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 2,
                    userID: 24,
                    terminalID: 4,
                    bankID: 12,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 3,
                    userID: 24,
                    terminalID: 4,
                    bankID: 13,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 4,
                    userID: 24,
                    terminalID: 5,
                    bankID: 14,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 5,
                    userID: 24,
                    terminalID: 6,
                    bankID: 15,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 6,
                    userID: 24,
                    terminalID: 7,
                    bankID: 16,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 7,
                    userID: 24,
                    terminalID: 8,
                    bankID: 17,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 8,
                    userID: 24,
                    terminalID: 9,
                    bankID: 18,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 9,
                    userID: 24,
                    terminalID: 10,
                    bankID: 19,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                },
                {
                    serviceID: 10,
                    userID: 24,
                    terminalID: 11,
                    bankID: 20,
                    settings: JSON.stringify({ param1: 'value1', param2: 'value2' })
                }
            ]);
        });
};

/*
te dare contexto ahora de los point_sale relacionados a los business y los terminales asociados a esos point_sale para posteriormente hacerte una peticion

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('point_sale').del()
      .then(function () {
        // Inserts seed entries
        return knex('point_sale').insert([
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Point Sale 1',
            description: 'Description for Point Sale 1',
            pos_details: JSON.stringify({ location: 'Caracas', device: 'POS Terminal' }),
            association_date: '2023-01-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 1,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174001',
            name: 'Point Sale 2',
            description: 'Description for Point Sale 2',
            pos_details: JSON.stringify({ location: 'Valencia', device: 'Mobile POS' }),
            association_date: '2023-02-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 2,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174002',
            name: 'Point Sale 3',
            description: 'Description for Point Sale 3',
            pos_details: JSON.stringify({ location: 'Maracaibo', device: 'Online Payment Gateway' }),
            association_date: '2023-03-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 3,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174003',
            name: 'Point Sale 4',
            description: 'Description for Point Sale 4',
            pos_details: JSON.stringify({ location: 'Barquisimeto', device: 'POS Terminal' }),
            association_date: '2023-04-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 4,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174004',
            name: 'Point Sale 5',
            description: 'Description for Point Sale 5',
            pos_details: JSON.stringify({ location: 'Mérida', device: 'Mobile POS' }),
            association_date: '2023-05-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 5,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174005',
            name: 'Point Sale 6',
            description: 'Description for Point Sale 6',
            pos_details: JSON.stringify({ location: 'Puerto Ordaz', device: 'Online Payment Gateway' }),
            association_date: '2023-06-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 6,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174006',
            name: 'Point Sale 7',
            description: 'Description for Point Sale 7',
            pos_details: JSON.stringify({ location: 'Barcelona', device: 'POS Terminal' }),
            association_date: '2023-07-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 7,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174007',
            name: 'Point Sale 8',
            description: 'Description for Point Sale 8',
            pos_details: JSON.stringify({ location: 'San Cristóbal', device: 'Mobile POS' }),
            association_date: '2023-08-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 8,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174008',
            name: 'Point Sale 9',
            description: 'Description for Point Sale 9',
            pos_details: JSON.stringify({ location: 'Maracay', device: 'Online Payment Gateway' }),
            association_date: '2023-09-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 9,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174009',
            name: 'Point Sale 10',
            description: 'Description for Point Sale 10',
            pos_details: JSON.stringify({ location: 'Cumaná', device: 'POS Terminal' }),
            association_date: '2023-10-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 10,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174010',
            name: 'Point Sale 11',
            description: 'Description for Point Sale 11',
            pos_details: JSON.stringify({ location: 'Ciudad Bolívar', device: 'Mobile POS' }),
            association_date: '2023-11-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 11,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174011',
            name: 'Point Sale 12',
            description: 'Description for Point Sale 12',
            pos_details: JSON.stringify({ location: 'La Guaira', device: 'Online Payment Gateway' }),
            association_date: '2023-12-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 12,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174012',
            name: 'Point Sale 13',
            description: 'Description for Point Sale 13',
            pos_details: JSON.stringify({ location: 'Guarenas', device: 'POS Terminal' }),
            association_date: '2024-01-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 13,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174013',
            name: 'Point Sale 14',
            description: 'Description for Point Sale 14',
            pos_details: JSON.stringify({ location: 'Los Teques', device: 'Mobile POS' }),
            association_date: '2024-02-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 14,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174014',
            name: 'Point Sale 15',
            description: 'Description for Point Sale 15',
            pos_details: JSON.stringify({ location: 'Punto Fijo', device: 'Online Payment Gateway' }),
            association_date: '2024-03-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 15,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174015',
            name: 'Point Sale 16',
            description: 'Description for Point Sale 16',
            pos_details: JSON.stringify({ location: 'Porlamar', device: 'POS Terminal' }),
            association_date: '2024-04-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 16,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174016',
            name: 'Point Sale 17',
            description: 'Description for Point Sale 17',
            pos_details: JSON.stringify({ location: 'Maturín', device: 'Mobile POS' }),
            association_date: '2024-05-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 17,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174017',
            name: 'Point Sale 18',
            description: 'Description for Point Sale 18',
            pos_details: JSON.stringify({ location: 'Cabimas', device: 'Online Payment Gateway' }),
            association_date: '2024-06-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 18,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174018',
            name: 'Point Sale 19',
            description: 'Description for Point Sale 19',
            pos_details: JSON.stringify({ location: 'Acarigua', device: 'POS Terminal' }),
            association_date: '2024-07-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 19,
          },
          {
            pos_GUID:'123e4567-e89b-12d3-a456-426614174019',
            name: 'Point Sale 20',
            description: 'Description for Point Sale 20',
            pos_details: JSON.stringify({ location: 'Santa Teresa del Tuy', device: 'Mobile POS' }),
            association_date: '2024-08-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 20,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174020',
            name: 'Point Sale 21',
            description: 'Description for Point Sale 21',
            pos_details: JSON.stringify({ location: 'Puerto Cabello', device: 'Online Payment Gateway' }),
            association_date: '2024-09-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 21,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174021',
            name: 'Point Sale 22',
            description: 'Description for Point Sale 22',
            pos_details: JSON.stringify({ location: 'Guacara', device: 'POS Terminal' }),
            association_date: '2024-10-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 22,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174022',
            name: 'Point Sale 23',
            description: 'Description for Point Sale 23',
            pos_details: JSON.stringify({ location: 'La Victoria', device: 'Mobile POS' }),
            association_date: '2024-11-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 1,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174023',
            name: 'Point Sale 24',
            description: 'Description for Point Sale 24',
            pos_details: JSON.stringify({ location: 'El Tigre', device: 'Online Payment Gateway' }),
            association_date: '2024-12-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 2,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174024',
            name: 'Point Sale 25',
            description: 'Description for Point Sale 25',
            pos_details: JSON.stringify({ location: 'Guatire', device: 'POS Terminal' }),
            association_date: '2025-01-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 3,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174025',
            name: 'Point Sale 26',
            description: 'Description for Point Sale 26',
            pos_details: JSON.stringify({ location: 'Ocumare del Tuy', device: 'Mobile POS' }),
            association_date: '2025-02-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 4,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174026',
            name: 'Point Sale 27',
            description: 'Description for Point Sale 27',
            pos_details: JSON.stringify({ location: 'El Limón', device: 'Online Payment Gateway' }),
            association_date: '2025-03-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 5,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174027',
            name: 'Point Sale 28',
            description: 'Description for Point Sale 28',
            pos_details: JSON.stringify({ location: 'San Felipe', device: 'POS Terminal' }),
            association_date: '2025-04-15',
            active: true,
            point_sale_category_id: 1,
            business_id: 6,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174028',
            name: 'Point Sale 29',
            description: 'Description for Point Sale 29',
            pos_details: JSON.stringify({ location: 'Araure', device: 'Mobile POS' }),
            association_date: '2025-05-20',
            active: true,
            point_sale_category_id: 1,
            business_id: 7,
          },
          { 
            pos_GUID: '123e4567-e89b-12d3-a456-426614174029',
            name: 'Point Sale 30',
            description: 'Description for Point Sale 30',
            pos_details: JSON.stringify({ location: 'El Vigía', device: 'Online Payment Gateway' }),
            association_date: '2025-06-10',
            active: true,
            point_sale_category_id: 1,
            business_id: 8,
          },
        ]);
      });
  };

exports.seed = function(knex) {
    return knex('terminal_entities').del()
        .then(function () {
            return knex('terminal_entities').insert([
                {
                    t_guid: 'ce66334e-8e7e-49ec-bade-7c43277c6555',
                    name: 'Terminal Entity 1',
                    description: 'Descripción de la entidad terminal 1',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 1,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'c7462d5d-9537-48a7-b2f1-14b06eebea43',
                    name: 'Terminal Entity 2',
                    description: 'Descripción de la entidad terminal 2',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 2,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'a143f5a9-1d9b-4f41-94ac-9297e9f269cc',
                    name: 'Terminal Entity 3',
                    description: 'Descripción de la entidad terminal 3',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 3,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'd2f00d44-ff8d-4455-9d9a-bfb9d99c47e7',
                    name: 'Terminal Entity 4',
                    description: 'Descripción de la entidad terminal 4',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 4,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'e7bf0b2d-0f3e-4c9d-8e7f-8d23e746a7d7',
                    name: 'Terminal Entity 5',
                    description: 'Descripción de la entidad terminal 5',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 5,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'f8b4e8b7-4c4e-45df-b8d7-6d4ee2786bb7',
                    name: 'Terminal Entity 6',
                    description: 'Descripción de la entidad terminal 6',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 6,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'ab7b59b1-3cc5-4dc5-bc37-93d77d4c4ecf',
                    name: 'Terminal Entity 7',
                    description: 'Descripción de la entidad terminal 7',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 7,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'b63a4a60-8b7a-403d-83da-e90d3c774e77',
                    name: 'Terminal Entity 8',
                    description: 'Descripción de la entidad terminal 8',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 8,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'c2f10c19-9f7f-4d45-9e7a-5f2a71a9b9bb',
                    name: 'Terminal Entity 9',
                    description: 'Descripción de la entidad terminal 9',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 9,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'd8d5c26b-2b67-47e4-8c92-6d28a9c9b377',
                    name: 'Terminal Entity 10',
                    description: 'Descripción de la entidad terminal 10',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 10,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'e2b1c6de-4a7e-4e5b-9d34-7d26b8c6e177',
                    name: 'Terminal Entity 11',
                    description: 'Descripción de la entidad terminal 11',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 11,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'f1d7b8d5-5f8e-43b4-87c8-8d57b7c8e177',
                    name: 'Terminal Entity 12',
                    description: 'Descripción de la entidad terminal 12',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 12,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'g2d3b4a1-6e7d-49d3-8b67-9d57b9c8f177',
                    name: 'Terminal Entity 13',
                    description: 'Descripción de la entidad terminal 13',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 13,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'h1e4d2c5-7f6b-40c4-8e78-9e58a8b8g177',
                    name: 'Terminal Entity 14',
                    description: 'Descripción de la entidad terminal 14',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 14,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'i3e1d2b5-8f7a-41c5-8f79-9f59a9c8h177',
                    name: 'Terminal Entity 15',
                    description: 'Descripción de la entidad terminal 15',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 15,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'j4d2c1b6-9g8b-42d6-8g80-9g60b8d8i177',
                    name: 'Terminal Entity 16',
                    description: 'Descripción de la entidad terminal 16',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 16,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'k5c2d3b7-0h9c-43d7-8h81-9h61c9e9j177',
                    name: 'Terminal Entity 17',
                    description: 'Descripción de la entidad terminal 17',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 17,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'l6b3e4c8-1i0d-44d8-8i82-9i62d0f0k177',
                    name: 'Terminal Entity 18',
                    description: 'Descripción de la entidad terminal 18',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 18,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'm7a4d5b9-2j1e-45d9-8j83-9j63e1g1l177',
                    name: 'Terminal Entity 19',
                    description: 'Descripción de la entidad terminal 19',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 19,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'n8b5c6a0-3k2f-46e0-8k84-9k64f2h2m177',
                    name: 'Terminal Entity 20',
                    description: 'Descripción de la entidad terminal 20',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 20,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'o9c6d7b1-4l3g-47f1-8l85-9l65g3i3n177',
                    name: 'Terminal Entity 21',
                    description: 'Descripción de la entidad terminal 21',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 21,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'p0d7e8c2-5m4h-48g2-8m86-9m66h4j4o177',
                    name: 'Terminal Entity 22',
                    description: 'Descripción de la entidad terminal 22',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 22,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'q1e8f9d3-6n5i-49h3-8n87-9n67i5k5p177',
                    name: 'Terminal Entity 23',
                    description: 'Descripción de la entidad terminal 23',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 23,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'r2f9g0e4-7o6j-40i4-8o88-9o68j6l6q177',
                    name: 'Terminal Entity 24',
                    description: 'Descripción de la entidad terminal 24',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 24,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 's3g0h1f5-8p7k-41j5-8p89-9p69k7m7r177',
                    name: 'Terminal Entity 25',
                    description: 'Descripción de la entidad terminal 25',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 25,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 't4h1i2g6-9q8l-42k6-8q90-9q70l8n8s177',
                    name: 'Terminal Entity 26',
                    description: 'Descripción de la entidad terminal 26',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 26,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'u5i2j3h7-0r9m-43l7-8r91-9r71m9o9t177',
                    name: 'Terminal Entity 27',
                    description: 'Descripción de la entidad terminal 27',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 27,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'v6j3k4i8-1s0n-44m8-8s92-9s72n0p0u177',
                    name: 'Terminal Entity 28',
                    description: 'Descripción de la entidad terminal 28',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 28,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'w7k4l5j9-2t1o-45n9-8t93-9t73o1q1v177',
                    name: 'Terminal Entity 29',
                    description: 'Descripción de la entidad terminal 29',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 29,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'x8l5m6k0-3u2p-46o0-8u94-9u74p2r2w177',
                    name: 'Terminal Entity 30',
                    description: 'Descripción de la entidad terminal 30',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 30,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'y9m6n7l1-4v3q-47p1-8v95-9v75q3s3x177',
                    name: 'Terminal Entity 31',
                    description: 'Descripción de la entidad terminal 31',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 1,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'z0n7o8m2-5w4r-48q2-8w96-9w76r4t4y177',
                    name: 'Terminal Entity 32',
                    description: 'Descripción de la entidad terminal 32',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 2,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'a1o8p9n3-6x5s-49r3-8x97-9x77s5u5z177',
                    name: 'Terminal Entity 33',
                    description: 'Descripción de la entidad terminal 33',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 3,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'b2p9q0o4-7y6t-40s4-8y98-9y78t6v6a177',
                    name: 'Terminal Entity 34',
                    description: 'Descripción de la entidad terminal 34',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 4,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'c3q0r1p5-8z7u-41t5-8z99-9z79u7w7b177',
                    name: 'Terminal Entity 35',
                    description: 'Descripción de la entidad terminal 35',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 5,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'd4r1s2q6-9a8v-42u6-8a90-9a80v8x8c177',
                    name: 'Terminal Entity 36',
                    description: 'Descripción de la entidad terminal 36',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 6,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'e5s2t3r7-0b9w-43v7-8b91-9b81w9y9d177',
                    name: 'Terminal Entity 37',
                    description: 'Descripción de la entidad terminal 37',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 7,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'f6t3u4s8-1c0x-44w8-8c92-9c82x0z0e177',
                    name: 'Terminal Entity 38',
                    description: 'Descripción de la entidad terminal 38',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 8,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'g7u4v5t9-2d1y-45x9-8d93-9d83y1a1f177',
                    name: 'Terminal Entity 39',
                    description: 'Descripción de la entidad terminal 39',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 9,
                    association_date: '2024-05-30',
                    active: true
                },
                {
                    t_guid: 'h8v5w6u0-3e2z-46y0-8e94-9e84z2b2g177',
                    name: 'Terminal Entity 40',
                    description: 'Descripción de la entidad terminal 40',
                    app_param: '{"param1": "value1", "param2": "value2"}',
                    fee: 10.5,
                    terminal_category_id: 1,
                    point_sale_id: 10,
                    association_date: '2024-05-30',
                    active: true
                }
            ]);
        });
};

ten en cuenta el orden de las relaciones para la siguiente pregunta

*/