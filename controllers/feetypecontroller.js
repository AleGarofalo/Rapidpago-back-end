const FeeType = require('../models/FeeTypes');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todos los tipos de tarifas
async function getAllFeeTypes(req, res, next) {
    try {
        logger.info('Fetching all fee types');
        const feeTypes = await FeeType.getAll();
        res.status(200).json(feeTypes);
    } catch (error) {
        logger.error(`Error fetching all fee types - ${error.message}`);
        next(error);
    }
}

// Obtener todos los tipos de tarifas activas
async function getAllActiveFeeTypes(req, res, next) {
    try {
        logger.info('Fetching all active fee types');
        const feeTypes = await FeeType.getAllActive();
        res.status(200).json(feeTypes);
    } catch (error) {
        logger.error(`Error fetching all active fee types - ${error.message}`);
        next(error);
    }
}

// Obtener un tipo de tarifa por ID
async function getFeeTypeById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching fee type ID: ${id}`);
        const feeType = await FeeType.getById(id);
        if (!feeType) {
            throw new ValidationError('El tipo de tarifa no existe');
        }
        res.status(200).json(feeType);
    } catch (error) {
        logger.error(`Error fetching fee type by ID - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo tipo de tarifa
async function createFeeType(req, res, next) {
    const { description, amount, userID } = req.body;
    try {
        logger.info(`Attempting to create fee type: ${description}`);

        // Verificar si el tipo de tarifa ya existe por descripción
        const existingFeeType = await FeeType.getByDescription(description);
        if (existingFeeType) {
            throw new ValidationError('El tipo de tarifa ya se encuentra registrado');
        }

        // Insertar el nuevo tipo de tarifa en la base de datos
        const newFeeType = await FeeType.create({ description, amount, userID });

        logger.info(`Fee type created successfully: ${description}`);
        res.status(201).json({
            message: 'Tipo de tarifa creado correctamente',
            data: newFeeType,
        });
    } catch (error) {
        logger.error(`Error creating fee type - ${error.message}`);
        next(error);
    }
}

// Actualizar un tipo de tarifa por ID
async function updateFeeType(req, res, next) {
    const { id } = req.params;
    const updatedFeeType = req.body;
    try {
        logger.info(`Attempting to update fee type with ID: ${id}`);

        // Verificar si el tipo de tarifa existe
        const existingFeeType = await FeeType.getById(id);
        if (!existingFeeType) {
            throw new ValidationError('El tipo de tarifa no existe');
        }

        // Actualizar el timestamp
        updatedFeeType.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el tipo de tarifa en la base de datos
        const feeType = await FeeType.update(id, updatedFeeType);
        logger.info(`Fee type updated successfully: ${id}`);
        res.status(200).json({
            message: 'Tipo de tarifa actualizado correctamente',
            data: feeType,
        });
    } catch (error) {
        logger.error(`Error updating fee type with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un tipo de tarifa por ID
async function deleteFeeType(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete fee type with ID: ${id}`);

        // Verificar si el tipo de tarifa existe antes de eliminar
        const existingFeeType = await FeeType.getById(id);
        if (!existingFeeType) {
            throw new ValidationError('El tipo de tarifa no existe');
        }

        // Eliminar el tipo de tarifa de la base de datos
        await FeeType.delete(id);
        logger.info(`Fee type deleted successfully: ${id}`);
        res.status(200).json({ message: 'Tipo de tarifa eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting fee type with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllFeeTypes,
    getAllActiveFeeTypes,
    getFeeTypeById,
    createFeeType,
    updateFeeType,
    deleteFeeType,
};
