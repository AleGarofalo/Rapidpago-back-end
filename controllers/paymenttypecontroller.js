const PaymentType = require('../models/PaymentType');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todos los tipos de pago
async function getAllPaymentTypes(req, res, next) {
    try {
        logger.info('Fetching all payment types');
        const paymentTypes = await PaymentType.getAll();
        res.status(200).json(paymentTypes);
    } catch (error) {
        logger.error(`Error fetching all payment types - ${error.message}`);
        next(error);
    }
}

// Obtener todos los tipos de pago activos
async function getAllActivePaymentTypes(req, res, next) {
    try {
        logger.info('Fetching all active payment types');
        const paymentTypes = await PaymentType.getAllActive();
        res.status(200).json(paymentTypes);
    } catch (error) {
        logger.error(`Error fetching all active payment types - ${error.message}`);
        next(error);
    }
}

// Obtener un tipo de pago por ID
async function getPaymentTypeById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching payment type ID: ${id}`);
        const paymentType = await PaymentType.getById(id);
        if (!paymentType) {
            throw new ValidationError('El tipo de pago no existe');
        }
        res.status(200).json(paymentType);
    } catch (error) {
        logger.error(`Error fetching payment type by ID - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo tipo de pago
async function createPaymentType(req, res, next) {
    const { description, userID } = req.body;
    try {
        logger.info(`Attempting to create payment type: ${description}`);

        // Verificar si el tipo de pago ya existe por descripción
        const existingPaymentType = await PaymentType.getByDescription(description);
        if (existingPaymentType) {
            throw new ValidationError('El tipo de pago ya se encuentra registrado');
        }

        // Insertar el nuevo tipo de pago en la base de datos
        const newPaymentType = await PaymentType.create({ description, userID });

        logger.info(`Payment type created successfully: ${description}`);
        res.status(201).json({
            message: 'Tipo de pago creado correctamente',
            data: newPaymentType,
        });
    } catch (error) {
        logger.error(`Error creating payment type - ${error.message}`);
        next(error);
    }
}

// Actualizar un tipo de pago por ID
async function updatePaymentType(req, res, next) {
    const { id } = req.params;
    const updatedPaymentType = req.body;
    try {
        logger.info(`Attempting to update payment type with ID: ${id}`);

        // Verificar si el tipo de pago existe
        const existingPaymentType = await PaymentType.getById(id);
        if (!existingPaymentType) {
            throw new ValidationError('El tipo de pago no existe');
        }

        // Actualizar el timestamp
        updatedPaymentType.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el tipo de pago en la base de datos
        const paymentType = await PaymentType.update(id, updatedPaymentType);
        logger.info(`Payment type updated successfully: ${id}`);
        res.status(200).json({
            message: 'Tipo de pago actualizado correctamente',
            data: paymentType,
        });
    } catch (error) {
        logger.error(`Error updating payment type with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un tipo de pago por ID
async function deletePaymentType(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete payment type with ID: ${id}`);

        // Verificar si el tipo de pago existe antes de eliminar
        const existingPaymentType = await PaymentType.getById(id);
        if (!existingPaymentType) {
            throw new ValidationError('El tipo de pago no existe');
        }

        // Eliminar el tipo de pago de la base de datos
        await PaymentType.delete(id);
        logger.info(`Payment type deleted successfully: ${id}`);
        res.status(200).json({ message: 'Tipo de pago eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting payment type with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllPaymentTypes,
    getAllActivePaymentTypes,
    getPaymentTypeById,
    createPaymentType,
    updatePaymentType,
    deletePaymentType,
};
