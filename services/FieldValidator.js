const statusCode = require('./ResponseStatus');

/**
 * Valida un campo basado en las reglas proporcionadas
 * @param {any} value - El valor del campo a ser validado
 * @param {Object} rules - Las reglas de validación
 * @returns {Object} - Retorna un objeto con un boolean `isValid` y un mensaje de error si no es válido
 */
const validateField = (value, rules) => {
    if (rules.required && (value === undefined || value === null || value === '')) {
        return { isValid: false, error: statusCode.EMPTY_FIELD };
    }

    if (rules.type) {
        // Clonar el objeto de statusCode.VALIDATE_FIELD_ERROR_TYPE
        const errorType = { ...statusCode.VALIDATE_FIELD_ERROR_TYPE };
        if (rules.type === 'string' && typeof value !== 'string') {
            // Modificar la descripción clonada
            errorType.DESCRIPTION += ', Debe ser una cadena de texto';
            return { isValid: false, error: errorType };
        }
        if (rules.type === 'number' && typeof value !== 'number') {
            errorType.DESCRIPTION += ', Debe ser un número';
            return { isValid: false, error: errorType };
        }
        // Validar tipo alfanumérico
        if (rules.type === 'alphanumeric' && !/^[a-z0-9]+$/i.test(value)) {
            errorType.DESCRIPTION += ', Debe ser alfanumérico';
            return { isValid: false, error: errorType };
        }
        // Validar tipo boolean
        if (rules.type === 'boolean' && typeof value !== 'boolean') {
            errorType.DESCRIPTION += ', Debe ser true o false';
            return { isValid: false, error: errorType };
        }
        // Añadir otras verificaciones de tipo si es necesario
    }

    if (
        rules.minLength &&
        (
            typeof value === 'string' ||
            typeof value === 'alphanumeric' ||
            typeof value === 'number'
        ) &&
        value.length < rules.minLength
    ) {
        statusCode.VALIDATE_FIELD_ERROR_LENGTH.DESCRIPTION += `, mínimo ${rules.minLength} caracteres`;
        return { isValid: false, error: statusCode.VALIDATE_FIELD_ERROR_LENGTH };
    }

    if (
        rules.maxLength &&
        (
            typeof value === 'string' ||
            typeof value === 'alphanumeric' ||
            typeof value === 'number'
        ) &&
        value.length > rules.maxLength
    ) {
        statusCode.VALIDATE_FIELD_ERROR_LENGTH.DESCRIPTION += `, máximo ${rules.maxLength} caracteres`;
        return { isValid: false, error: statusCode.VALIDATE_FIELD_ERROR_LENGTH };
    }

    if (rules.pattern && !rules.pattern.test(value)) {
        return { isValid: false, error: statusCode.VALIDATE_FIELD_ERROR_REGEX };
    }

    return { isValid: true, error: null };
};

/**
 * Valida múltiples campos basado en las reglas proporcionadas
 * @param {Object} data - El objeto de datos que contiene los campos a ser validados
 * @param {Object} rules - Las reglas de validación para cada campo
 * @returns {Object} - Retorna un objeto con un boolean `isValid`, una lista de errores detallados, y un código de estado HTTP
 */
const validateFields = (data, rules) => {
    const errors = [];

    for (const field in rules) {
        if (rules.hasOwnProperty(field)) {
            const result = validateField(data[field], rules[field]);
            if (!result.isValid) {
                errors.push({ field, error: result.error });
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        statusCode: errors.length === 0 ? 200 : 400
    };
};

module.exports = validateFields;
