const Order = require("../models/Order");
const OrderPayment = require("../models/OrderPayment");
const moment = require("moment-timezone");
const logger = require("../config/logger");
const { ValidationError } = require("../middleware/errorhandler");

// Obtener todas las ventas
async function getAllOrders(req, res, next) {
  try {
    logger.info("Fetching all orders");
    const orders = await Order.getAll();
    res.status(200).json(orders);
  } catch (error) {
    logger.error(`Error fetching all orders - ${error.message}`);
    next(error);
  }
}

// Obtener una venta por ID
async function getOrderById(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Fetching order with ID: ${id}`);
    const order = await Order.getById(id);
    if (!order) {
      throw new ValidationError("La orden no existe");
    }
    res.status(200).json(order);
  } catch (error) {
    logger.error(`Error fetching order by ID - ${error.message}`);
    next(error);
  }
}

// Crear una nueva venta
async function createOrder(req, res, next) {
  const {
    order_number,
    amount,
    remaining_balance,
    userID,
    businessID,
    saleparameterID,
  } = req.body;
  try {
    logger.info("Attempting to create a new sale");
    console.log(amount);

    // Insertar la nueva venta en la base de datos
    const newOrder = await Order.create({
      order_number,
      amount,
      remaining_balance,
      userID,
      businessID,
      saleparameterID,
    });

    logger.info("Order created successfully");
    res.status(201).json({
      message: "Orden creada correctamente",
      data: newOrder,
    });
  } catch (error) {
    logger.error(`Error creating order - ${error.message}`);
    next(error);
  }
}

// Actualizar una venta por ID
async function updateOrder(req, res, next) {
  const { id } = req.params;
  const updatedOrder = req.body;
  try {
    logger.info(`Attempting to update order with ID: ${id}`);

    // Verificar si la venta existe
    const existingOrder = await Order.getById(id);
    if (!existingOrder) {
      throw new ValidationError("La orden no existe");
    }

    // Actualizar el timestamp
    updatedOrder.updated_at = moment()
      .tz("America/Caracas")
      .format("YYYY-MM-DD HH:mm:ss");

    // Actualizar la venta en la base de datos
    const order = await Order.update(id, updatedOrder);
    logger.info(`Order updated successfully: ${id}`);
    res.status(200).json({
      message: "Orden actualizada correctamente",
      data: order,
    });
  } catch (error) {
    logger.error(`Error updating order with ID: ${id} - ${error.message}`);
    next(error);
  }
}

// Eliminar una venta por ID
async function deleteOrder(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Attempting to delete order with ID: ${id}`);

    // Verificar si la venta existe antes de eliminar
    const existingOrder = await Order.getById(id);
    if (!existingOrder) {
      throw new ValidationError("La orden no existe");
    }

    // Eliminar la venta de la base de datos
    await Order.delete(id);
    logger.info(`Order deleted successfully: ${id}`);
    res.status(200).json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    logger.error(`Error deleting order with ID: ${id} - ${error.message}`);
    next(error);
  }
}

// Obtener órdenes por businessID
async function getPendingOrdersByBusiness(req, res, next) {
  const { businessID } = req.params;
  try {
    logger.info(`Fetching orders for business ID: ${businessID}`);
    const orders = await Order.getPendingOrdersByBusiness(businessID);
    if (!orders.length) {
      throw new ValidationError("No existen órdenes para este negocio");
    }
    res.status(200).json(orders);
  } catch (error) {
    logger.error(
      `Error fetching orders by business ID: ${businessID} - ${error.message}`
    );
    next(error);
  }
}

// Obtener el monto pendiente de una orden
async function getRemainingAmount(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Fetching remaining amount for order ID: ${id}`);
    const remainingAmount = await OrderPayment.getRemainingAmountByOrderID(id);
    res.status(200).json(remainingAmount);
  } catch (error) {
    logger.error(`Error fetching remaining amount - ${error.message}`);
    next(error);
  }
}

// Obtener órdenes por rango de fechas
async function getOrdersByDateRange(req, res, next) {
  const { startDate, endDate } = req.query; // Espera las fechas como parámetros de consulta
  try {
    logger.info(`Fetching orders between ${startDate} and ${endDate}`);

    // Validar que ambas fechas estén presentes
    if (!startDate || !endDate) {
      throw new ValidationError("startDate y endDate son requeridos");
    }

    const orders = await Order.getOrdersByDateRange(startDate, endDate);
    if (!orders.length) {
      logger.info(`No orders found between ${startDate} and ${endDate}`);
      return res
        .status(404)
        .json({ message: "No se encontraron órdenes en el rango de fechas" });
    }

    res.status(200).json(orders);
  } catch (error) {
    logger.error(
      `Error fetching orders between ${startDate} and ${endDate} - ${error.message}`
    );
    next(error);
  }
}

async function getPendingOrdersForUser(req, res, next) {
  const { userID } = req.params; // Espera el userID como parámetro en la URL
  try {
    logger.info(`Fetching pending orders for user ID: ${userID}`);

    // Validar que el userID esté presente
    if (!userID) {
      throw new ValidationError("El userID es requerido");
    }

    const orders = await Order.getPendingOrdersForUser(userID);
    if (!orders.length) {
      logger.info(`No pending orders found for user ID: ${userID}`);
      return res.status(404).json({
        message: "No se encontraron órdenes pendientes para este usuario",
      });
    }

    res.status(200).json(orders);
  } catch (error) {
    logger.error(
      `Error fetching pending orders for user ID: ${userID} - ${error.message}`
    );
    next(error);
  }
}

async function getOrderSummaryForUser(req, res, next) {
  const { userID } = req.params;
  try {
    // Validar que el userID esté presente
    if (!userID) {
      throw new ValidationError("El userID es requerido");
    }

    const summary = await Order.getOrderSummaryForUser(userID);
    if (summary.length === 0) {
      throw new ValidationError("El usuario no tiene ordenes registradas");
    }
    res.status(200).json(summary);
  } catch (error) {
    logger.error("Error fetching order summary:", error);
    next(error);
  }
}

async function getOrderDetails(req, res, next) {
  const { orderID } = req.params;
  try {
    // Validar que el orderID esté presente
    if (!orderID) {
      throw new ValidationError("El orderID es requerido");
    }

    const details = await Order.getOrderDetails(orderID);
    if (!details || !details.orderDetails) {
      throw new ValidationError("No se encontró la orden especificada");
    }

    res.status(200).json(details);
  } catch (error) {
    logger.error("Error fetching order details:", error);
    next(error);
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getPendingOrdersByBusiness,
  getRemainingAmount,
  getOrdersByDateRange,
  getPendingOrdersForUser,
  getOrderSummaryForUser,
  getOrderDetails,
};
