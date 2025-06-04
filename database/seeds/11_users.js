const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports.seed = async function(knex) {
  await knex('users').insert([
    {
      userGUID: uuidv4(),
      username: 'jgonzalez',
      password: await bcrypt.hash('Abc125.', 10),
      password_expiration_days: 180,
      firstname: 'Juenidtson',
      lastname: 'Gonzalez',
      dni_type: JSON.stringify({ type: 'V' }),
      dni: '21120466',
      gender: JSON.stringify({ type: 'male' }),
      birthdate: '1993-03-08',
      email: 'j.gonzalez@rapidpago.com',
      phonecode:412,
      phone:1258874,
      address: JSON.stringify({
        street: 'Av. Victor Baptista',
        city: 'Los Teques',
        state: 'Miranda',
        country: 'Venezuela',
        postalCode: "1201",
        houseOrApartment: "Casa",
        number: "12-A",
        floor: "PB",
        referencePoint: "La entrada al lado de la cauchera trailer",
        additionalInstructions: ""
      }),
      active: true,
      roleID: 1,
      created_at: new Date()
    },
    {
      userGUID: uuidv4(),
      username: 'tvazquez',
      password: await bcrypt.hash('Abc125.', 10),
      password_expiration_days: 180,
      firstname: 'Tadeo',
      lastname: 'Vazquez',
      dni_type: JSON.stringify({ type: 'V' }),
      dni: '27752958',
      gender: JSON.stringify({ type: 'male' }),
      birthdate: '2000-08-18',
      email: 'teiduemc@gmail.com',
      phonecode:424,
      phone:4458796,
      address: JSON.stringify({
        street: 'Av. El casquillo',
        city: 'Caracas',
        state: 'Distrito Capital',
        country: 'Venezuela',
        postalCode: "1050",
        houseOrApartment: "Apartamento",
        number: "4",
        floor: "4",
        referencePoint: "Al lado del colegio humboldt",
        additionalInstructions: ""
      }),
      active: true,
      roleID: 1,
      created_at: new Date()
    }
  ]);

  const phoneCodes = [424, 412, 414, 416, 426]; // Valores permitidos para phonecode

  // Inserción de 22 usuarios adicionales
  const additionalUsers = [];
  for (let i = 1; i <= 22; i++) {
    additionalUsers.push({
      userGUID: uuidv4(),
      username: `user${i}`,
      password: await bcrypt.hash('Password123!', 10),
      password_expiration_days: 180,
      firstname: `Firstname${i}`,
      lastname: `Lastname${i}`,
      dni_type: JSON.stringify({ type: 'V' }),
      dni: `12345678${i}`,
      gender: JSON.stringify({ type: 'male' }),
      birthdate: `1990-01-0${i}`,
      email: `user${i}@example.com`,
      phonecode: phoneCodes[i % phoneCodes.length], // Asignar uno de los valores permitidos de phonecode
      phone: Math.floor(1000000 + Math.random() * 9000000), // Generar un número de 7 dígitos
      address: JSON.stringify({
        street: `Street ${i}`,
        city: 'Caracas',
        state: 'Distrito Capital',
        country: 'Venezuela',
        postalCode: `100${i}`,
        houseOrApartment: "Apartamento",
        number: `${i}`,
        floor: `${i}`,
        referencePoint: `Reference Point ${i}`,
        additionalInstructions: ""
      }),
      active: true,
      roleID: 2,
      created_at: new Date()
    });
  }

  await knex('users').insert(additionalUsers);
};
