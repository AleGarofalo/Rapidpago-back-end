const express = require("express");
const router = express.Router();

const {
  getTotalSales,
  getTotalRevenue,
  getTotalProductsSold,
  getOrderStatusCounts,
  getTopZonesBySales,
  getBestSellingDays,
  getTopClients,
  getTopSellingModels,
  getInventoryStatus,
  getInventoryMovements,
  getTopPaymentMethods,
  getPaymentsByCurrency,
  getSalesBySaleType,
  getOrderToSalesConversionRate,
  getSalesByBusiness,
} = require("../controllers/queriescontroller");

const validateDashboardParams = require("../middleware/dashboardValidator");

// Ruta para obtener el total de ventas
router.get("/totalsales", validateDashboardParams, getTotalSales);

// Ruta para obtener ingresos totales
router.get("/totalrevenue", validateDashboardParams, getTotalRevenue);

// Ruta para obtener la cantidad total de productos vendidos
router.get("/totalproductssold", validateDashboardParams, getTotalProductsSold);

// Ruta para obtener el conteo de estados de órdenes
router.get("/orderstatuscounts", validateDashboardParams, getOrderStatusCounts);

// Ruta para obtener las zonas con mayores ventas
router.get(
  "/topzonesbysales/:userID",
  validateDashboardParams,
  getTopZonesBySales
);

// Ruta para obtener las mejores horas de ventas
router.get("/bestsellingdays", validateDashboardParams, getBestSellingDays);

// Ruta para obtener los clientes con mayores compras
router.get("/topclients", validateDashboardParams, getTopClients);

// Ruta para obtener los modelos más vendidos
router.get("/topsellingmodels", validateDashboardParams, getTopSellingModels);

// Ruta para obtener el estado del inventario
router.get("/inventorystatus", validateDashboardParams, getInventoryStatus);

// Ruta para obtener movimientos de inventario
router.get(
  "/inventorymovements",
  validateDashboardParams,
  getInventoryMovements
);

// Ruta para obtener las formas de pago más utilizadas
router.get("/toppaymentmethods", validateDashboardParams, getTopPaymentMethods);

// Ruta para obtener los pagos por moneda
router.get(
  "/paymentsbycurrency",
  validateDashboardParams,
  getPaymentsByCurrency
);

// Ruta para obtener las ventas por categoría
router.get("/salesbysaletype", validateDashboardParams, getSalesBySaleType);

// Ruta para obtener la tasa de conversión de órdenes a ventas
router.get(
  "/ordertosalesconversionrate",
  validateDashboardParams,
  getOrderToSalesConversionRate
);

// Ruta para obtener las ventas por negocio o punto de venta
router.get("/salesbybusiness", validateDashboardParams, getSalesByBusiness);

module.exports = router;
