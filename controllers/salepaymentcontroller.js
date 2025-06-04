const SalePayment = require('../models/SalePayment');
const Currency = require('../models/Currency');
const PaymentType = require('../models/PaymentType');
const Sale = require('../models/Sale');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');
const moment = require('moment-timezone');

// Obtener todos los pagos
async function getAllSalePayments(req, res, next) {
    try {
        logger.info('Fetching all sale payments');
        const salePayments = await SalePayment.getAll();
        res.status(200).json(salePayments);
    } catch (error) {
        logger.error(`Error fetching sale payments - ${error.message}`);
        next(error);
    }
}

// Obtener un pago por ID
async function getSalePaymentById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching sale payment with ID: ${id}`);
        const salePayment = await SalePayment.getById(id);
        if (!salePayment) {
            throw new ValidationError('El pago no existe');
        }
        res.status(200).json(salePayment);
    } catch (error) {
        logger.error(`Error fetching sale payment by ID - ${error.message}`);
        next(error);
    }
}

// Obtener pagos por saleID
async function getSalePaymentsBySaleId(req, res, next) {
    const { saleID } = req.params;
    try {
        logger.info(`Fetching sale payments for saleID: ${saleID}`);
        const salePayments = await SalePayment.getBySaleId(saleID);
        if (!salePayments || salePayments.length === 0) {
            throw new ValidationError('No se encontraron pagos para esta venta');
        }
        res.status(200).json(salePayments);
    } catch (error) {
        logger.error(`Error fetching sale payments by saleID - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo pago
async function createSalePayment(req, res, next) {
    const { saleID, amount, currencyID, paymenttypeID, exchange_rate, exchange_date } = req.body;
    try {
        logger.info('Attempting to create a new sale payment');

        // Crear el nuevo pago en la base de datos
        const newSalePayment = await SalePayment.create({
            saleID,
            amount,
            currencyID,
            paymenttypeID,
            exchange_rate,
            exchange_date: moment(exchange_date).tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss'),
        });

        logger.info('Sale payment created successfully');
        res.status(201).json({
            message: 'Pago de venta creado correctamente',
            data: newSalePayment,
        });
    } catch (error) {
        logger.error(`Error creating sale payment - ${error.message}`);
        next(error);
    }
}

// Actualizar un pago por ID
async function updateSalePayment(req, res, next) {
    const { id } = req.params;
    const updatedSalePayment = req.body;
    try {
        logger.info(`Attempting to update sale payment with ID: ${id}`);

        // Verificar si el pago existe
        const existingSalePayment = await SalePayment.getById(id);
        if (!existingSalePayment) {
            throw new ValidationError('El pago no existe');
        }

        // Actualizar el timestamp
        updatedSalePayment.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el pago en la base de datos
        const salePayment = await SalePayment.update(id, updatedSalePayment);
        logger.info(`Sale payment updated successfully: ${id}`);
        res.status(200).json({
            message: 'Pago de venta actualizado correctamente',
            data: salePayment,
        });
    } catch (error) {
        logger.error(`Error updating sale payment with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un pago por ID
async function deleteSalePayment(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete sale payment with ID: ${id}`);

        // Verificar si el pago existe antes de eliminar
        const existingSalePayment = await SalePayment.getById(id);
        if (!existingSalePayment) {
            throw new ValidationError('El pago no existe');
        }

        // Eliminar el pago de la base de datos
        await SalePayment.delete(id);
        logger.info(`Sale payment deleted successfully: ${id}`);
        res.status(200).json({ message: 'Pago de venta eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting sale payment with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllSalePayments,
    getSalePaymentById,
    getSalePaymentsBySaleId,
    createSalePayment,
    updateSalePayment,
    deleteSalePayment,
};
