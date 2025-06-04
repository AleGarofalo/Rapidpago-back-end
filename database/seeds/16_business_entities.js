const { v4: uuidv4 } = require('uuid');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('business_entities').del()
    .then(function () {
      // Inserts seed entries
      return knex('business_entities').insert([
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-12345678-9',
          address: JSON.stringify({ street: 'Av. Principal', city: 'Caracas', state: 'Distrito Capital', postal_code: '1010' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Alimentos' }),
          legal_name: 'Supermercados Central, C.A.',
          comercial_name: 'Central Madeirense',
          active: true,
          association_date: '2010-05-12',
          business_category_id: 1, // Independiente
          business_parent_id: null, // No tiene empresa madre
        },
        {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-11223344-5',
            address: JSON.stringify({ street: 'Calle 14', city: 'Maracaibo', state: 'Zulia', postal_code: '4001' }),
            business_details: JSON.stringify({ sector: 'Retail', industry: 'Vestuario' }),
            legal_name: 'Boutique Zulia, C.A.',
            comercial_name: 'Boutique Zulia',
            active: true,
            association_date: '2015-07-20',
            business_category_id: 1, // Independiente
            business_parent_id: null, // No tiene empresa madre
          },
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-99887766-7',
            address: JSON.stringify({ street: 'Av. Bolívar', city: 'Valencia', state: 'Carabobo', postal_code: '2001' }),
            business_details: JSON.stringify({ sector: 'Retail', industry: 'Electrónica' }),
            legal_name: 'Electrónica Valencia, C.A.',
            comercial_name: 'ElectroShop',
            active: true,
            association_date: '2018-11-10',
            business_category_id: 3, // Asociación
            business_parent_id: null, // No tiene empresa madre
          },
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-55443322-1',
            address: JSON.stringify({ street: 'Calle Real', city: 'Barquisimeto', state: 'Lara', postal_code: '3001' }),
            business_details: JSON.stringify({ sector: 'Servicios', industry: 'Consultoría' }),
            legal_name: 'Consultores Lara, C.A.',
            comercial_name: 'ConsultingLara',
            active: true,
            association_date: '2016-09-05',
            business_category_id: 1, // Independiente
            business_parent_id: null, // No tiene empresa madre
          },
          // Añadir 20 inserciones adicionales con ejemplos variados
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-12343210-9',
            address: JSON.stringify({ street: 'Av. Fuerzas Armadas', city: 'Mérida', state: 'Mérida', postal_code: '5001' }),
            business_details: JSON.stringify({ sector: 'Retail', industry: 'Comida Rápida' }),
            legal_name: 'Inversiones Fast Food, C.A.',
            comercial_name: 'BurgerMerida',
            active: true,
            association_date: '2017-04-23',
            business_category_id: 2, // Franquicia
            business_parent_id: null, // Independiente en este ejemplo
          },
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-10987654-3',
            address: JSON.stringify({ street: 'Av. Los Próceres', city: 'San Cristóbal', state: 'Táchira', postal_code: '5002' }),
            business_details: JSON.stringify({ sector: 'Servicios', industry: 'Educación' }),
            legal_name: 'Academia Tachira, C.A.',
            comercial_name: 'EduTachira',
            active: true,
            association_date: '2014-06-17',
            business_category_id: 1, // Independiente
            business_parent_id: null, // No tiene empresa madre
          },
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-11224433-6',
            address: JSON.stringify({ street: 'Av. Urdaneta', city: 'Caracas', state: 'Distrito Capital', postal_code: '1012' }),
            business_details: JSON.stringify({ sector: 'Tecnología', industry: 'Desarrollo de Software' }),
            legal_name: 'Tech Caracas, C.A.',
            comercial_name: 'TechDev',
            active: true,
            association_date: '2019-02-14',
            business_category_id: 4, // Hosting
            business_parent_id: null, // No tiene empresa madre
          },
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-33445566-0',
            address: JSON.stringify({ street: 'Av. Lara', city: 'Barquisimeto', state: 'Lara', postal_code: '3002' }),
            business_details: JSON.stringify({ sector: 'Salud', industry: 'Servicios Médicos' }),
            legal_name: 'Clínica Lara, C.A.',
            comercial_name: 'SaludLara',
            active: true,
            association_date: '2013-10-01',
            business_category_id: 3, // Asociación
            business_parent_id: null, // No tiene empresa madre
          },
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-44556677-8',
            address: JSON.stringify({ street: 'Av. Las Delicias', city: 'Maracay', state: 'Aragua', postal_code: '2101' }),
            business_details: JSON.stringify({ sector: 'Retail', industry: 'Supermercados' }),
            legal_name: 'Supermercados Aragua, C.A.',
            comercial_name: 'AraguaMarket',
            active: true,
            association_date: '2011-08-30',
            business_category_id: 2, // Franquicia
            business_parent_id: null, // No tiene empresa madre
          },
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-55667788-9',
            address: JSON.stringify({ street: 'Calle 7', city: 'Puerto Ordaz', state: 'Bolívar', postal_code: '8050' }),
            business_details: JSON.stringify({ sector: 'Manufactura', industry: 'Metalmecánica' }),
            legal_name: 'Industria Bolívar, C.A.',
            comercial_name: 'MetalBolivar',
            active: true,
            association_date: '2020-01-20',
            business_category_id: 3, // Asociación
            business_parent_id: null, // No tiene empresa madre
          },
          {
            be_GUID: uuidv4(),
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-66778899-0',
            address: JSON.stringify({ street: 'Calle 5', city: 'Cumaná', state: 'Sucre', postal_code: '6101' }),
            business_details: JSON.stringify({ sector: 'Servicios', industry: 'Turismo' }),
            legal_name: 'Turismo Sucre, C.A.',
            comercial_name: 'TravelSucre',
            active: true,
            association_date: '2013-05-10',
            business_category_id: 1, // Independiente
            business_parent_id: null, // No tiene empresa madre
          },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-87654321-0',
          address: JSON.stringify({ street: 'Av. Libertador', city: 'Caracas', state: 'Distrito Capital', postal_code: '1011' }),
          business_details: JSON.stringify({ sector: 'Servicios', industry: 'Hostelería' }),
          legal_name: 'Inversiones Hotel Caracas, C.A.',
          comercial_name: 'Hotel Caracas',
          active: true,
          association_date: '2012-03-15',
          business_category_id: 2, // Franquicia
          business_parent_id: 1, // Pertenece a Supermercados Central
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-12345679-0',
          address: JSON.stringify({ street: 'Av. San Martín', city: 'Caracas', state: 'Distrito Capital', postal_code: '1020' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Farmacéutica' }),
          legal_name: 'Farmatodo, C.A.',
          comercial_name: 'Farmatodo',
          active: true,
          association_date: '2005-04-15',
          business_category_id: 2, // Franquicia
          business_parent_id: null, // No tiene empresa madre
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-12345679-1',
          address: JSON.stringify({ street: 'Av. Urdaneta', city: 'Caracas', state: 'Distrito Capital', postal_code: '1021' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Farmacéutica' }),
          legal_name: 'Farmatodo Sucursal 1, C.A.',
          comercial_name: 'Farmatodo Sucursal 1',
          active: true,
          association_date: '2006-05-20',
          business_category_id: 2, // Franquicia
          business_parent_id: 13, // Pertenece a Farmatodo
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-12345679-2',
          address: JSON.stringify({ street: 'Av. Bolívar', city: 'Maracay', state: 'Aragua', postal_code: '2101' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Farmacéutica' }),
          legal_name: 'Farmatodo Sucursal 2, C.A.',
          comercial_name: 'Farmatodo Sucursal 2',
          active: true,
          association_date: '2007-06-25',
          business_category_id: 2, // Franquicia
          business_parent_id: 13, // Pertenece a Farmatodo
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-12345679-3',
          address: JSON.stringify({ street: 'Av. Miranda', city: 'Valencia', state: 'Carabobo', postal_code: '2001' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Farmacéutica' }),
          legal_name: 'Farmatodo Sucursal 3, C.A.',
          comercial_name: 'Farmatodo Sucursal 3',
          active: true,
          association_date: '2008-07-30',
          business_category_id: 2, // Franquicia
          business_parent_id: 13, // Pertenece a Farmatodo
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-12345679-4',
          address: JSON.stringify({ street: 'Av. Lecuna', city: 'Caracas', state: 'Distrito Capital', postal_code: '1022' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Farmacéutica' }),
          legal_name: 'Farmatodo Sucursal 4, C.A.',
          comercial_name: 'Farmatodo Sucursal 4',
          active: true,
          association_date: '2009-08-15',
          business_category_id: 2, // Franquicia
          business_parent_id: 13, // Pertenece a Farmatodo
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-98765432-1',
          address: JSON.stringify({ street: 'Av. Francisco de Miranda', city: 'Caracas', state: 'Distrito Capital', postal_code: '1010' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Alimentos' }),
          legal_name: 'Supermercados Plaza, C.A.',
          comercial_name: 'Supermercados Plaza',
          active: true,
          association_date: '2010-06-12',
          business_category_id: 2, // Franquicia
          business_parent_id: null, // No tiene empresa madre
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-98765432-2',
          address: JSON.stringify({ street: 'Calle Los Cedros', city: 'Maracaibo', state: 'Zulia', postal_code: '4001' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Alimentos' }),
          legal_name: 'Supermercados Plaza Sucursal 1, C.A.',
          comercial_name: 'Supermercados Plaza Sucursal 1',
          active: true,
          association_date: '2011-07-13',
          business_category_id: 2, // Franquicia
          business_parent_id: 18, // Pertenece a Supermercados Plaza
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-98765432-3',
          address: JSON.stringify({ street: 'Av. Sucre', city: 'Barquisimeto', state: 'Lara', postal_code: '3001' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Alimentos' }),
          legal_name: 'Supermercados Plaza Sucursal 2, C.A.',
          comercial_name: 'Supermercados Plaza Sucursal 2',
          active: true,
          association_date: '2012-08-14',
          business_category_id: 2, // Franquicia
          business_parent_id: 18, // Pertenece a Supermercados Plaza
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-98765432-4',
          address: JSON.stringify({ street: 'Calle Comercio', city: 'Valencia', state: 'Carabobo', postal_code: '2001' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Alimentos' }),
          legal_name: 'Supermercados Plaza Sucursal 3, C.A.',
          comercial_name: 'Supermercados Plaza Sucursal 3',
          active: true,
          association_date: '2013-09-15',
          business_category_id: 2, // Franquicia
          business_parent_id: 18, // Pertenece a Supermercados Plaza
        },
        {
          be_GUID: uuidv4(),
          dni_type: JSON.stringify({ type: 'J' }),
          dni: 'J-98765432-5',
          address: JSON.stringify({ street: 'Av. Los Próceres', city: 'Mérida', state: 'Mérida', postal_code: '5001' }),
          business_details: JSON.stringify({ sector: 'Retail', industry: 'Alimentos' }),
          legal_name: 'Supermercados Plaza Sucursal 4, C.A.',
          comercial_name: 'Supermercados Plaza Sucursal 4',
          active: true,
          association_date: '2014-10-16',
          business_category_id: 2, // Franquicia
          business_parent_id: 18, // Pertenece a Supermercados Plaza
        }
        // Puedes continuar agregando más empresas si es necesario
      ]);
    });
};