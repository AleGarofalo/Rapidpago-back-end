const OrderPayment = require("../models/OrderPayment");
const Currency = require("../models/Currency");
const PaymentType = require("../models/PaymentType");
const Order = require("../models/Order");
const moment = require("moment-timezone");
const logger = require("../config/logger");
const { ValidationError } = require("../middleware/errorhandler");

// Obtener todas los pagos de venta
async function getAllOrdersPayments(req, res, next) {
  try {
    logger.info("Fetching all orders payemnts");
    const orderspayments = await OrderPayment.getAll();
    res.status(200).json(orderspayments);
  } catch (error) {
    logger.error(`Error fetching all orders payments - ${error.message}`);
    next(error);
  }
}

// Obtener todos los pagos de una orden por ID de orden
async function getPaymentsByOrderId(req, res, next) {
  const { orderID } = req.params;
  try {
    logger.info(`Fetching payments for order ID: ${orderID}`);
    const payments = await OrderPayment.getByOrderId(orderID);
    if (!payments.length) {
      throw new ValidationError("No existen pagos para esta orden");
    }
    res.status(200).json(payments);
  } catch (error) {
    logger.error(`Error fetching payments by order ID - ${error.message}`);
    next(error);
  }
}

// Obtener todos los pagos de una orden por número de orden
async function getPaymentsByOrderNumber(req, res, next) {
  const { orderNumber } = req.params;
  try {
    logger.info(`Fetching payments for order number: ${orderNumber}`);
    const payments = await OrderPayment.getByOrderNumber(orderNumber);
    if (!payments.length) {
      throw new ValidationError("No existen pagos para esta orden");
    }
    res.status(200).json(payments);
  } catch (error) {
    logger.error(`Error fetching payments by order number - ${error.message}`);
    next(error);
  }
}

// Crear un nuevo pago para una orden
async function createOrderPayment(req, res, next) {
  const {
    Details,
    orderID,
    paymenttypeID,
    payment_amount,
    currencyID,
    exchange_rate,
    exchange_date,
  } = req.body;
  try {
    logger.info("Attempting to create a new payment for an order");

    // Insertar el nuevo pago en la base de datos
    const newPayment = await OrderPayment.create({
      Details,
      orderID,
      paymenttypeID,
      payment_amount,
      currencyID,
      exchange_rate,
      exchange_date,
    });

    logger.info("Payment created successfully");
    res.status(201).json({
      message: "Pago creado correctamente",
      data: newPayment,
    });
  } catch (error) {
    logger.error(`Error creating payment - ${error.message}`);
    next(error);
  }
}

// Actualizar un pago por ID
async function updateOrderPayment(req, res, next) {
  const { id } = req.params;
  const updatedPayment = req.body;
  try {
    logger.info(`Attempting to update payment with ID: ${id}`);

    // Verificar si el pago existe
    const existingPayment = await OrderPayment.getById(id);
    if (!existingPayment) {
      throw new ValidationError("El pago no existe");
    }

    // Actualizar el timestamp
    updatedPayment.updated_at = moment()
      .tz("America/Caracas")
      .format("YYYY-MM-DD HH:mm:ss");

    // Actualizar el pago en la base de datos
    const payment = await OrderPayment.update(id, updatedPayment);
    logger.info(`Payment updated successfully: ${id}`);
    res.status(200).json({
      message: "Pago actualizado correctamente",
      data: payment,
    });
  } catch (error) {
    logger.error(`Error updating payment with ID: ${id} - ${error.message}`);
    next(error);
  }
}

// Eliminar un pago por ID
async function deleteOrderPayment(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Attempting to delete payment with ID: ${id}`);

    // Verificar si el pago existe antes de eliminar
    const existingPayment = await OrderPayment.getById(id);
    if (!existingPayment) {
      throw new ValidationError("El pago no existe");
    }

    // Eliminar el pago de la base de datos
    await OrderPayment.delete(id);
    logger.info(`Payment deleted successfully: ${id}`);
    res.status(200).json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    logger.error(`Error deleting payment with ID: ${id} - ${error.message}`);
    next(error);
  }
}

module.exports = {
  getAllOrdersPayments,
  getPaymentsByOrderId,
  getPaymentsByOrderNumber,
  createOrderPayment,
  updateOrderPayment,
  deleteOrderPayment,
};
