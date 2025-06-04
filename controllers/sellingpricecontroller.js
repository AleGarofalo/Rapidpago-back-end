const SellingPrice = require('../models/SellingPrice');
const Currency = require('../models/Currency');
const Model = require('../models/Model');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todos los precios de venta
async function getAllSellingPrices(req, res, next) {
    try {
        logger.info('Fetching all selling prices');
        const sellingPrices = await SellingPrice.getAll();
        res.status(200).json(sellingPrices);
    } catch (error) {
        logger.error(`Error fetching all selling prices - ${error.message}`);
        next(error);
    }
}

// Obtener todos los precios activos
async function getAllActiveSellingPrices(req, res, next) {
    try {
        logger.info('Fetching all active selling prices');
        const sellingPrices = await SellingPrice.getAllActive();
        res.status(200).json(sellingPrices);
    } catch (error) {
        logger.error(`Error fetching all active selling prices - ${error.message}`);
        next(error);
    }
}

// Obtener un precio por ID
async function getSellingPriceById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching selling price with ID: ${id}`);
        const sellingPrice = await SellingPrice.getById(id);
        if (!sellingPrice) {
            throw new ValidationError('El precio de venta no existe');
        }
        res.status(200).json(sellingPrice);
    } catch (error) {
        logger.error(`Error fetching selling price by ID - ${error.message}`);
        next(error);
    }
}

// Obtener un precio por ID
async function getSellingPrice(req, res, next) {
    const { currencyID,modelID} = req.params;
    try {
        logger.info(`Fetching selling price for model ID: ${modelID}`);
        const currency = await Currency.getById(currencyID);
        if (!currency) {
            throw new ValidationError('La moneda no se encuentra registrada');
        }
        const model = await Model.getById(modelID);
        if (!model) {
            throw new ValidationError('El modelo no existe');
        }
        const sellingPrice = await SellingPrice.getSellPrice(currencyID,modelID);
        if (!sellingPrice) {
            throw new ValidationError('El precio de venta no existe');
        }
        res.status(200).json(sellingPrice);
    } catch (error) {
        logger.error(`Error fetching selling price for Model - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo precio de venta
async function createSellingPrice(req, res, next) {
    const { amount, pricedate, userID, currencyID, modelID } = req.body;
    try {
        logger.info('Attempting to create a new selling price');

        // Insertar el nuevo precio en la base de datos
        const newSellingPrice = await SellingPrice.create({
            amount,
            pricedate: pricedate || moment().tz('America/Caracas').format('YYYY-MM-DD'),
            userID,
            currencyID,
            modelID
        });

        logger.info('Selling price created successfully');
        res.status(201).json({
            message: 'Precio de venta creado correctamente',
            data: newSellingPrice,
        });
    } catch (error) {
        logger.error(`Error creating selling price - ${error.message}`);
        next(error);
    }
}

// Actualizar un precio de venta por ID
async function updateSellingPrice(req, res, next) {
    const { id } = req.params;
    const updatedSellingPrice = req.body;
    try {
        logger.info(`Attempting to update selling price with ID: ${id}`);

        // Verificar si el precio existe
        const existingSellingPrice = await SellingPrice.getById(id);
        if (!existingSellingPrice) {
            throw new ValidationError('El precio de venta no existe');
        }

        // Actualizar el timestamp
        updatedSellingPrice.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el precio de venta en la base de datos
        const sellingPrice = await SellingPrice.update(id, updatedSellingPrice);
        logger.info(`Selling price updated successfully: ${id}`);
        res.status(200).json({
            message: 'Precio de venta actualizado correctamente',
            data: sellingPrice,
        });
    } catch (error) {
        logger.error(`Error updating selling price with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un precio de venta por ID
async function deleteSellingPrice(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete selling price with ID: ${id}`);

        // Verificar si el precio existe antes de eliminar
        const existingSellingPrice = await SellingPrice.getById(id);
        if (!existingSellingPrice) {
            throw new ValidationError('El precio de venta no existe');
        }

        // Eliminar el precio de venta de la base de datos
        await SellingPrice.delete(id);
        logger.info(`Selling price deleted successfully: ${id}`);
        res.status(200).json({ message: 'Precio de venta eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting selling price with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllSellingPrices,
    getAllActiveSellingPrices,
    getSellingPriceById,
    getSellingPrice,
    createSellingPrice,
    updateSellingPrice,
    deleteSellingPrice,
};
