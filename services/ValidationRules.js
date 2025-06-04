const paymentValidationRules = {
    amount: {
        required: true,
        type: 'number',
        minLength: 1
    },
    currency: {
        required: true,
        type: 'string',
        maxLength: 3
    },
    description: {
        required: false,
        type: 'string',
        maxLength: 255
    },
    // Agregar otros campos y reglas según sea necesario
};
const consultValidationRules = {
    reference: {
        required: true,
        type: 'number',
        minLength: 1
    }
};

//! Nuevo esquema base de datos.
const getBySerialAndUserAndBankCodeAndActiveValidationRules = { 
    serial: {
        required: true,
        type: 'alphanumeric',
        minLength: 15
    },
    active: {
        required: true,
        type: 'boolean',
    },
    user: {
        required: true,
        type: 'string',
        maxLength: 255
    },
    bankService: {
        required: true,
        type: 'string',
        minLength: 4,
        maxLength: 4
    },
    // Agregar otros campos y reglas según sea necesario
};
module.exports = {
    paymentValidationRules,
    consultValidationRules,
    getBySerialAndUserAndBankCodeAndActiveValidationRules,
    // Exportar otras reglas de validación según sea necesario
};