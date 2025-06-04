exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('bank_services').del();

    // Datos de ejemplo para servicios y bancos
    const services = await knex('services').select('id');
    const banks = await knex('banks').select('id');

    // Preparar las asignaciones
    const bankServices = [
        { serviceID: services[0].id, bankID: banks[0].id },
        { serviceID: services[1].id, bankID: banks[0].id },
        { serviceID: services[2].id, bankID: banks[0].id },
        { serviceID: services[0].id, bankID: banks[1].id },
        { serviceID: services[1].id, bankID: banks[1].id },
        { serviceID: services[2].id, bankID: banks[1].id },
        { serviceID: services[0].id, bankID: banks[2].id },
        { serviceID: services[1].id, bankID: banks[2].id },
        { serviceID: services[2].id, bankID: banks[2].id },
        { serviceID: services[0].id, bankID: banks[3].id },
        { serviceID: services[1].id, bankID: banks[3].id },
        { serviceID: services[2].id, bankID: banks[3].id },
        { serviceID: services[0].id, bankID: banks[4].id },
        { serviceID: services[1].id, bankID: banks[4].id },
        { serviceID: services[2].id, bankID: banks[4].id },
        { serviceID: services[0].id, bankID: banks[5].id },
        { serviceID: services[1].id, bankID: banks[5].id },
        { serviceID: services[2].id, bankID: banks[5].id },
        { serviceID: services[0].id, bankID: banks[6].id },
        { serviceID: services[1].id, bankID: banks[6].id },
        { serviceID: services[2].id, bankID: banks[6].id },
        { serviceID: services[0].id, bankID: banks[7].id },
        { serviceID: services[1].id, bankID: banks[7].id },
        { serviceID: services[2].id, bankID: banks[7].id },
        { serviceID: services[0].id, bankID: banks[8].id },
        { serviceID: services[1].id, bankID: banks[8].id },
        { serviceID: services[2].id, bankID: banks[8].id },
        { serviceID: services[0].id, bankID: banks[9].id },
        { serviceID: services[1].id, bankID: banks[9].id },
        { serviceID: services[2].id, bankID: banks[9].id }
    ];

    // Insertar las asignaciones
    await knex('bank_services').insert(bankServices);
};