exports.seed = function (knex) {
  const contactPeople = [];
  const businessCount = 22; // Número de negocios registrados
  const contactCountPerBusiness = 3; // Número de contactos por negocio

  const firstNames = ['Carlos', 'María', 'José', 'Ana', 'Luis', 'Carmen', 'Juan', 'Marta', 'Pedro', 'Laura'];
  const lastNames = ['González', 'Rodríguez', 'Pérez', 'Fernández', 'García', 'Martínez', 'López', 'Sánchez', 'Ramírez', 'Torres'];
  const domains = ['example.com', 'business.com', 'company.com', 'enterprise.com', 'organization.org'];
  
  // Códigos de área permitidos
  const phoneCodes = [414, 416, 412, 426, 424, 212];

  // Direcciones ficticias
  const addresses = [
    'Calle Falsa 123, Caracas',
    'Avenida Principal 45, Valencia',
    'Calle Secundaria 98, Maracaibo',
    'Urbanización El Sol 56, Barquisimeto',
    'Calle La Paz 67, Maracay',
    'Avenida Bolívar 101, Mérida',
    'Sector Las Mercedes 23, Puerto La Cruz',
    'Calle Colón 78, San Cristóbal',
    'Calle Sucre 22, Ciudad Bolívar',
    'Avenida Sucre 99, Maturín'
  ];

  for (let businessId = 1; businessId <= businessCount; businessId++) {
    for (let i = 0; i < contactCountPerBusiness; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
      
      // Selección aleatoria de código de área
      const phonecode1 = phoneCodes[Math.floor(Math.random() * phoneCodes.length)];
      const phonecode2 = phoneCodes[Math.floor(Math.random() * phoneCodes.length)];
      
      // Generación de número de teléfono completo
      const phone1 = `+58${phonecode1}${Math.floor(Math.random() * 9000000 + 1000000)}`;
      const phone2 = `+58${phonecode2}${Math.floor(Math.random() * 9000000 + 1000000)}`;

      // Selección aleatoria de dirección
      const address = addresses[Math.floor(Math.random() * addresses.length)];

      contactPeople.push({
        Name: firstName,
        LastName: lastName,
        Phone1: phone1,
        Phone2: phone2,
        Email: email,
        businessid: businessId,
        phonecode1: phonecode1, // Nuevo campo phonecode1
        phonecode2: phonecode2, // Nuevo campo phonecode2
        Address: address // Nuevo campo address con una dirección ficticia
      });
    }
  }

  return knex('contact_people')
    .del()
    .then(function () {
      return knex('contact_people').insert(contactPeople);
    });
};
