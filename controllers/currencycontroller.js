const Currency = require('../models/Currency');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todas las monedas
async function getAllCurrencies(req, res, next) {
    try {
        logger.info('Fetching all currencies');
        const currencies = await Currency.getAll();
        res.status(200).json(currencies);
    } catch (error) {
        logger.error(`Error fetching all currencies - ${error.message}`);
        next(error);
    }
}

// Obtener todas las monedas activas
async function getAllActiveCurrencies(req, res, next) {
    try {
        logger.info('Fetching all active currencies');
        const currencies = await Currency.getAllActive();
        res.status(200).json(currencies);
    } catch (error) {
        logger.error(`Error fetching all active currencies - ${error.message}`);
        next(error);
    }
}

// Obtener moneda por ID
async function getCurrencyById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching currency ID: ${id}`);
        const currency = await Currency.getById(id);
        if (!currency) {
            throw new ValidationError('La moneda no se encuentra registrada');
        }
        res.status(200).json(currency);
    } catch (error) {
        logger.error(`Error fetching currency - ${error.message}`);
        next(error);
    }
}

// Crear una nueva moneda
async function createCurrency(req, res, next) {
    const { name, symbol, exchange_rate, userID } = req.body;
    try {
        logger.info(`Attempting to create currency: ${name}`);

        // Verificar si la moneda ya existe en la base de datos
        const existingCurrency = await Currency.getByName(name);
        if (existingCurrency) {
            throw new ValidationError('La moneda ya se encuentra registrada');
        }

        // Insertar la nueva moneda en la base de datos
        const currency = await Currency.create({ name, symbol, exchange_rate, userID });

        logger.info(`Currency created successfully: ${name}`);
        res.status(201).json({
            message: 'Moneda creada correctamente',
            data: currency
        });
    } catch (error) {
        logger.error(`Error creating currency: ${error.message}`);
        next(error);
    }
}

// Actualizar una moneda existente
async function updateCurrency(req, res, next) {
    const { id } = req.params;
    const updatedCurrency = req.body;
    try {
        logger.info(`Attempting to update currency with ID: ${id}`);

        const existingCurrency = await Currency.getById(id);
        if (!existingCurrency) {
            throw new ValidationError('La moneda no se encuentra registrada');
        }

        updatedCurrency.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar la moneda en la base de datos
        await Currency.update(id, updatedCurrency);

        logger.info(`Currency updated successfully: ${id}`);
        res.status(200).json({
            message: 'Moneda actualizada correctamente',
            data: updatedCurrency
        });
    } catch (error) {
        logger.error(`Error updating currency with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar una moneda
async function deleteCurrency(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete currency with ID: ${id}`);

        const deletedCurrency = await Currency.delete(id);
        if (!deletedCurrency) {
            throw new ValidationError('La moneda no se encuentra registrada');
        }

        logger.info(`Currency deleted successfully: ${id}`);
        res.status(200).json({
            message: 'Moneda eliminada correctamente',
        });
    } catch (error) {
        logger.error(`Error deleting currency with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllCurrencies,
    getAllActiveCurrencies,
    getCurrencyById,
    createCurrency,
    updateCurrency,
    deleteCurrency,
};
