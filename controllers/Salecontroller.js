const Sale = require('../models/Sale');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todas las ventas
async function getAllSales(req, res, next) {
    try {
        logger.info('Fetching all sales');
        const sales = await Sale.getAll();
        res.status(200).json(sales);
    } catch (error) {
        logger.error(`Error fetching all sales - ${error.message}`);
        next(error);
    }
}

// Obtener una venta por ID
async function getSaleById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching sale with ID: ${id}`);
        const sale = await Sale.getById(id);
        if (!sale) {
            throw new ValidationError('La venta no existe');
        }
        res.status(200).json(sale);
    } catch (error) {
        logger.error(`Error fetching sale by ID - ${error.message}`);
        next(error);
    }
}

// Crear una nueva venta
async function createSale(req, res, next) {
    const { total_amount, userID, feetypeID, saleparameterID } = req.body;
    try {
        logger.info('Attempting to create a new sale');

        // Insertar la nueva venta en la base de datos
        const newSale = await Sale.create({
            total_amount,
            userID,
            feetypeID,
            saleparameterID,
        });

        logger.info('Sale created successfully');
        res.status(201).json({
            message: 'Venta creada correctamente',
            data: newSale,
        });
    } catch (error) {
        logger.error(`Error creating sale - ${error.message}`);
        next(error);
    }
}

// Actualizar una venta por ID
async function updateSale(req, res, next) {
    const { id } = req.params;
    const updatedSale = req.body;
    try {
        logger.info(`Attempting to update sale with ID: ${id}`);

        // Verificar si la venta existe
        const existingSale = await Sale.getById(id);
        if (!existingSale) {
            throw new ValidationError('La venta no existe');
        }

        // Actualizar el timestamp
        updatedSale.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar la venta en la base de datos
        const sale = await Sale.update(id, updatedSale);
        logger.info(`Sale updated successfully: ${id}`);
        res.status(200).json({
            message: 'Venta actualizada correctamente',
            data: sale,
        });
    } catch (error) {
        logger.error(`Error updating sale with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar una venta por ID
async function deleteSale(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete sale with ID: ${id}`);

        // Verificar si la venta existe antes de eliminar
        const existingSale = await Sale.getById(id);
        if (!existingSale) {
            throw new ValidationError('La venta no existe');
        }

        // Eliminar la venta de la base de datos
        await Sale.delete(id);
        logger.info(`Sale deleted successfully: ${id}`);
        res.status(200).json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        logger.error(`Error deleting sale with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
};
