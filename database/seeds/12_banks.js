exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('banks').del()
      .then(async function () {
        // Inserts seed entries
        return knex('banks').insert([
          {
            name: 'Banco 100% Banco, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-000008507',
            display_name: '100BANCO',
            active: true,
            code: '0172'
          },
          {
            name: 'Bancamiga, Banco Universal, C.A.',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-000030027',
            display_name: 'BANCAMIGA',
            active: true,
            code: '0173'
          },
          {
            name: 'Bancaribe C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000005294',
            display_name: 'BANCARIBE',
            alliance: true,
            active: true,
            code: '0114'
          },
          {
            name: 'Banco Activo, Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '080066227',
            display_name: 'BANCO ACTIVO',
            active: true,
            code: '0171'
          },
          {
            name: 'Banco Agrícola de Venezuela, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'G' }),
            dni: '200057955',
            display_name: 'BANCO AGRICOLA DE VENEZUELA',
            active: true,
            code: '0166'
          },
          {
            name: 'Banco Caroní, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000012738',
            display_name: 'BANCO CARONI',
            active: true,
            code: '0120'
          },
          {
            name: 'Banco de Venezuela, S.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '0000029482',
            display_name: 'BANCO DE VENEZUELA',
            alliance: true,
            active: true,
            code: '0102'
          },
          {
            name: 'Banco del Tesoro, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000013425',
            display_name: 'BANCO DEL TESORO',
            active: true,
            code: '0122'
          },
          {
            name: 'Banco Mercantil, C.A. (BANCO UNIVERSAL)',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000029610',
            display_name: 'BANCO MERCANTIL',
            active: true,
            code: '0103'
          },
          {
            name: 'Banco Plaza, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000009062',
            display_name: 'BANCO PLAZA',
            alliance: true,
            active: true,
            code: '0118'
          },
          {
            name: 'Banco Provincial, S.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000004467',
            display_name: 'BANCO PROVINCIAL',
            active: true,
            code: '0105'
          },
          {
            name: 'Banco Sofitasa, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000011614',
            display_name: 'BANCO SOFITASA',
            active: true,
            code: '0119'
          },
          {
            name: 'Banco de Comercio Exterior, C.A. (BANCOEX)',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000004441',
            display_name: 'BANCOEX',
            active: true,
            code: '0101'
          },
          {
            name: 'Bancrecer, S.A. Banco Microfinanciero',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '316374173',
            display_name: 'BANCRECER',
            alliance: true,
            domiciliation: true,
            partial_collection: true,
            centralized_collection: false,
            active: true,
            code: '0168'
          },
          {
            name: 'Banco Banesco, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000006237',
            display_name: 'BANESCO',
            active: true,
            code: '0134'
          },
          {
            name: 'Banco de la Fuerza Armada Nacional Bolivariana, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000013309',
            display_name: 'BANFANB',
            alliance: true,
            active: true,
            code: '0121'
          },
          {
            name: 'Bangente, C.A.',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '002522140',
            display_name: 'BANGENTE',
            active: true,
            code: '0170'
          },
          {
            name: 'Banplus, Banco Universal, C.A.',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-00026240-7',
            display_name: 'BANPLUS',
            alliance: true,
            active: true,
            code: '0146'
          },
          {
            name: 'BFC Banco Fondo Común, C.A.',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: 'J-00002772-0',
            display_name: 'BFC',
            alliance: true,
            active: true,
            code: '0147'
          },
          {
            name: 'Banco Bicentenario del Pueblo, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000007634',
            display_name: 'BICENTENARIO',
            alliance: true,
            active: true,
            code: '0116'
          },
          {
            name: 'Banco Nacional de Vivienda y Hábitat (BANAVIH)',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000006907',
            display_name: 'BANAVIH',
            active: true,
            code: '0107'
          },
          {
            name: 'Banco Occidental de Descuento, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000004760',
            display_name: 'BOD BANCO UNIVERSAL',
            active: true,
            code: '0106'
          },
          {
            name: 'Banco del Sur, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '402467717',
            display_name: 'DEL SUR',
            alliance: true,
            active: true,
            code: '0186'
          },
          {
            name: 'Mi Banco, Banco Microfinanciero, C.A.',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '315941023',
            display_name: 'MIBANCO',
            alliance: true,
            active: true,
            code: '0169'
          },
          {
            name: 'Banco Venezolano de Crédito S.A BANCO UNIVERSAL',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000029709',
            display_name: 'VENEZOLANO DE CREDITO',
            active: true,
            code: '0104'
          },
          {
            name: 'Banco Exterior, C.A. Banco Universal',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000008278',
            display_name: 'BANCO EXTERIOR',
            active: true,
            code: '0117'
          },
          {
            name: 'N58 Banco Digital Banco Microfinanciero',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '402463040',
            display_name: 'N58',
            active: true,
            code: '0185'
          },
          {
            name: 'Banco de Desarrollo Económico y Social de Venezuela (BANDES)',
            dni_type: JSON.stringify({ type: 'J' }),
            dni: '000008513',
            display_name: 'BANDES',
            active: true,
            code: '0108'
          }
        ]);
      });
  };
  