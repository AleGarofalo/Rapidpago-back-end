const SaleParameter = require('../models/SaleParameter');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todos los parámetros de venta
async function getAllSaleParameters(req, res, next) {
    try {
        logger.info('Fetching all sale parameters');
        const saleParameters = await SaleParameter.getAll();
        res.status(200).json(saleParameters);
    } catch (error) {
        logger.error(`Error fetching all sale parameters - ${error.message}`);
        next(error);
    }
}

// Obtener todos los parámetros activos
async function getAllActiveSaleParameters(req, res, next) {
    try {
        logger.info('Fetching all active sale parameters');
        const saleParameters = await SaleParameter.getAllActive();
        res.status(200).json(saleParameters);
    } catch (error) {
        logger.error(`Error fetching all active sale parameters - ${error.message}`);
        next(error);
    }
}

// Obtener un parámetro de venta por ID
async function getSaleParameterById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching sale parameter with ID: ${id}`);
        const saleParameter = await SaleParameter.getById(id);
        if (!saleParameter) {
            throw new ValidationError('El parámetro de venta no existe');
        }
        res.status(200).json(saleParameter);
    } catch (error) {
        logger.error(`Error fetching sale parameter by ID - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo parámetro de venta
async function createSaleParameter(req, res, next) {
    const { start_date, end_date, quota, amount, days, userID, saletypeID } = req.body;
    try {
        logger.info('Attempting to create a new sale parameter');

        // Insertar el nuevo parámetro de venta en la base de datos
        const newSaleParameter = await SaleParameter.create({
            start_date,
            end_date,
            quota,
            amount,
            days,
            userID,
            saletypeID
        });

        logger.info('Sale parameter created successfully');
        res.status(201).json({
            message: 'Parámetro de venta creado correctamente',
            data: newSaleParameter,
        });
    } catch (error) {
        logger.error(`Error creating sale parameter - ${error.message}`);
        next(error);
    }
}

// Actualizar un parámetro de venta por ID
async function updateSaleParameter(req, res, next) {
    const { id } = req.params;
    const updatedSaleParameter = req.body;
    try {
        logger.info(`Attempting to update sale parameter with ID: ${id}`);

        // Verificar si el parámetro de venta existe
        const existingSaleParameter = await SaleParameter.getById(id);
        if (!existingSaleParameter) {
            throw new ValidationError('El parámetro de venta no existe');
        }

        // Actualizar el timestamp
        updatedSaleParameter.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el parámetro de venta en la base de datos
        const saleParameter = await SaleParameter.update(id, updatedSaleParameter);
        logger.info(`Sale parameter updated successfully: ${id}`);
        res.status(200).json({
            message: 'Parámetro de venta actualizado correctamente',
            data: saleParameter,
        });
    } catch (error) {
        logger.error(`Error updating sale parameter with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un parámetro de venta por ID
async function deleteSaleParameter(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete sale parameter with ID: ${id}`);

        // Verificar si el parámetro de venta existe antes de eliminar
        const existingSaleParameter = await SaleParameter.getById(id);
        if (!existingSaleParameter) {
            throw new ValidationError('El parámetro de venta no existe');
        }

        // Eliminar el parámetro de venta de la base de datos
        await SaleParameter.delete(id);
        logger.info(`Sale parameter deleted successfully: ${id}`);
        res.status(200).json({ message: 'Parámetro de venta eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting sale parameter with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllSaleParameters,
    getAllActiveSaleParameters,
    getSaleParameterById,
    createSaleParameter,
    updateSaleParameter,
    deleteSaleParameter,
};
