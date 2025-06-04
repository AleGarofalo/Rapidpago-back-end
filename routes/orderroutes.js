const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/ordercontroller");

// Ruta para obtener la lista de todas las ordenes.
router.get("/getallorders", getAllOrders);

// Ruta para obtener un detalle de orden.
router.get("/getorder/:id", getOrderById);

// Ruta para crear una orden.
router.post("/create", createOrder);

// Ruta para actualizar un detalle de orden.
router.patch("/update/:id", updateOrder);

// Ruta para obtener órdenes pendientes por businessID.
router.get("/getpendingorders/:businessID", getPendingOrdersByBusiness);

// Ruta para obtener el monto pendiente de una orden por ID.
router.get("/getremainingamount/:id", getRemainingAmount);

// Ruta para obtener órdenes por rango de fechas
router.get("/getordersbydaterange", getOrdersByDateRange);

//PARA OBTENER LAS ORDENES PENDIENTES DE UN USUARIO
router.get("/pending-orders/:userID", getPendingOrdersForUser);

// Para obtener las ordenes de forma de prevista de un usuario
router.get("/order-summary/:userID", getOrderSummaryForUser);

//Para obtener al completo el detalle de una orden
router.get("/order-detail/:orderID", getOrderDetails);

module.exports = router;
