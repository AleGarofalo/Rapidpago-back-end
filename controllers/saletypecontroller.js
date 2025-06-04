const SaleType = require('../models/SaleType');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todos los tipos de venta
async function getAllSaleTypes(req, res, next) {
    try {
        logger.info('Fetching all sale types');
        const saleTypes = await SaleType.getAll();
        res.status(200).json(saleTypes);
    } catch (error) {
        logger.error(`Error fetching all sale types - ${error.message}`);
        next(error);
    }
}

// Obtener todos los tipos de venta activos
async function getAllActiveSaleTypes(req, res, next) {
    try {
        logger.info('Fetching all active sale types');
        const saleTypes = await SaleType.getAllActive();
        res.status(200).json(saleTypes);
    } catch (error) {
        logger.error(`Error fetching all active sale types - ${error.message}`);
        next(error);
    }
}

// Obtener un tipo de venta por ID
async function getSaleTypeById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching sale type ID: ${id}`);
        const saleType = await SaleType.getById(id);
        if (!saleType) {
            throw new ValidationError('El tipo de venta no existe');
        }
        res.status(200).json(saleType);
    } catch (error) {
        logger.error(`Error fetching sale type by ID - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo tipo de venta
async function createSaleType(req, res, next) {
    const { description, userID } = req.body;
    try {
        logger.info(`Attempting to create sale type: ${description}`);

        // Verificar si el tipo de venta ya existe por descripción
        const existingSaleType = await SaleType.getByDescription(description);
        if (existingSaleType) {
            throw new ValidationError('El tipo de venta ya se encuentra registrado');
        }

        // Insertar el nuevo tipo de venta en la base de datos
        const newSaleType = await SaleType.create({ description, userID });

        logger.info(`Sale type created successfully: ${description}`);
        res.status(201).json({
            message: 'Tipo de venta creado correctamente',
            data: newSaleType,
        });
    } catch (error) {
        logger.error(`Error creating sale type - ${error.message}`);
        next(error);
    }
}

// Actualizar un tipo de venta por ID
async function updateSaleType(req, res, next) {
    const { id } = req.params;
    const updatedSaleType = req.body;
    try {
        logger.info(`Attempting to update sale type with ID: ${id}`);

        // Verificar si el tipo de venta existe
        const existingSaleType = await SaleType.getById(id);
        if (!existingSaleType) {
            throw new ValidationError('El tipo de venta no existe');
        }

        // Actualizar el timestamp
        updatedSaleType.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el tipo de venta en la base de datos
        const saleType = await SaleType.update(id, updatedSaleType);
        logger.info(`Sale type updated successfully: ${id}`);
        res.status(200).json({
            message: 'Tipo de venta actualizado correctamente',
            data: saleType,
        });
    } catch (error) {
        logger.error(`Error updating sale type with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un tipo de venta por ID
async function deleteSaleType(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete sale type with ID: ${id}`);

        // Verificar si el tipo de venta existe antes de eliminar
        const existingSaleType = await SaleType.getById(id);
        if (!existingSaleType) {
            throw new ValidationError('El tipo de venta no existe');
        }

        // Eliminar el tipo de venta de la base de datos
        await SaleType.delete(id);
        logger.info(`Sale type deleted successfully: ${id}`);
        res.status(200).json({ message: 'Tipo de venta eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting sale type with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllSaleTypes,
    getAllActiveSaleTypes,
    getSaleTypeById,
    createSaleType,
    updateSaleType,
    deleteSaleType,
};
