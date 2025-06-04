const DashboardQueries = require("../services/DashboardQueries");
const logger = require("../config/logger");
const { ValidationError } = require("../middleware/errorhandler");

// Obtener el total de ventas
async function getTotalSales(req, res, next) {
  try {
    logger.info("Fetching total sales");
    console.log("Filtros recibidos:", req.query); // 👈 Agrega esto
    const filters = req.query;
    const totalSales = await DashboardQueries.getTotalSales(filters);
    res.status(200).json({ totalSales });
  } catch (error) {
    logger.error(`Error fetching total sales - ${error.message}`);
    next(error);
  }
}

// Obtener ingresos totales
async function getTotalRevenue(req, res, next) {
  try {
    logger.info("Fetching total revenue");
    const filters = req.query;
    const totalRevenue = await DashboardQueries.getTotalRevenue(filters);
    res.status(200).json({ totalRevenue });
  } catch (error) {
    logger.error(`Error fetching total revenue - ${error.message}`);
    next(error);
  }
}

// Obtener cantidad total de productos vendidos
async function getTotalProductsSold(req, res, next) {
  try {
    logger.info("Fetching total products sold");
    const filters = req.query;
    const totalProducts = await DashboardQueries.getTotalProductsSold(filters);
    res.status(200).json({ totalProducts });
  } catch (error) {
    logger.error(`Error fetching total products sold - ${error.message}`);
    next(error);
  }
}

// Obtener conteos de estados de órdenes
async function getOrderStatusCounts(req, res, next) {
  try {
    logger.info("Fetching order status counts");
    const filters = req.query;
    const statusCounts = await DashboardQueries.getOrderStatusCounts(filters);
    res.status(200).json(statusCounts);
  } catch (error) {
    logger.error(`Error fetching order status counts - ${error.message}`);
    next(error);
  }
}

// Obtener zonas con mayores ventas
async function getTopZonesBySales(req, res, next) {
  try {
    const { userID } = req.params;
    const filters = req.query;
    logger.info("Fetching top zones by sales");
    const topZones = await DashboardQueries.getTopZonesBySales(userID, filters);
    res.status(200).json(topZones);
  } catch (error) {
    logger.error(`Error fetching top zones by sales - ${error.message}`);
    next(error);
  }
}

// Obtener mejores horas de ventas
async function getBestSellingDays(req, res, next) {
  try {
    logger.info("Fetching best selling hours");
    const filters = req.query;
    const bestHours = await DashboardQueries.getBestSellingDays(filters);
    res.status(200).json(bestHours);
  } catch (error) {
    logger.error(`Error fetching best selling hours - ${error.message}`);
    next(error);
  }
}

// Obtener los clientes con mayores compras
async function getTopClients(req, res, next) {
  try {
    logger.info("Fetching top clients");
    const filters = req.query;
    const topClients = await DashboardQueries.getTopClients(filters);
    res.status(200).json(topClients);
  } catch (error) {
    logger.error(`Error fetching top clients - ${error.message}`);
    next(error);
  }
}

// Obtener modelos más vendidos
async function getTopSellingModels(req, res, next) {
  try {
    logger.info("Fetching top selling models");
    const filters = req.query;
    const topModels = await DashboardQueries.getTopSellingModels(filters);
    res.status(200).json(topModels);
  } catch (error) {
    logger.error(`Error fetching top selling models - ${error.message}`);
    next(error);
  }
}

// Obtener estado del inventario
async function getInventoryStatus(req, res, next) {
  try {
    logger.info("Fetching inventory status");
    const inventory = await DashboardQueries.getInventoryStatus();
    res.status(200).json(inventory);
  } catch (error) {
    logger.error(`Error fetching inventory status - ${error.message}`);
    next(error);
  }
}

// Obtener movimientos de inventario
async function getInventoryMovements(req, res, next) {
  try {
    logger.info("Fetching inventory movements");
    const movements = await DashboardQueries.getInventoryMovements();
    res.status(200).json(movements);
  } catch (error) {
    logger.error(`Error fetching inventory movements - ${error.message}`);
    next(error);
  }
}

// Obtener formas de pago más utilizadas
async function getTopPaymentMethods(req, res, next) {
  try {
    logger.info("Fetching top payment methods");
    const paymentMethods = await DashboardQueries.getTopPaymentMethods();
    res.status(200).json(paymentMethods);
  } catch (error) {
    logger.error(`Error fetching top payment methods - ${error.message}`);
    next(error);
  }
}

// Obtener pagos por moneda
async function getPaymentsByCurrency(req, res, next) {
  try {
    logger.info("Fetching payments by currency");
    const payments = await DashboardQueries.getPaymentsByCurrency();
    res.status(200).json(payments);
  } catch (error) {
    logger.error(`Error fetching payments by currency - ${error.message}`);
    next(error);
  }
}

// Obtener ventas por categoría
async function getSalesBySaleType(req, res, next) {
  try {
    logger.info("Fetching sales by category");
    const salesByCategory = await DashboardQueries.getSalesBySaleType();
    res.status(200).json(salesByCategory);
  } catch (error) {
    logger.error(`Error fetching sales by category - ${error.message}`);
    next(error);
  }
}

// Obtener tasa de conversión de órdenes a ventas
async function getOrderToSalesConversionRate(req, res, next) {
  try {
    logger.info("Fetching order to sales conversion rate");
    const filters = req.query;
    const conversionRate = await DashboardQueries.getOrderToSalesConversionRate(
      filters
    );
    res.status(200).json({ conversionRate });
  } catch (error) {
    logger.error(
      `Error fetching order to sales conversion rate - ${error.message}`
    );
    next(error);
  }
}

// Obtener ventas por negocio o punto de venta
async function getSalesByBusiness(req, res, next) {
  try {
    logger.info("Fetching sales by business");
    const filters = req.query;
    const salesByBusiness = await DashboardQueries.getSalesByBusiness(filters);
    res.status(200).json(salesByBusiness);
  } catch (error) {
    logger.error(`Error fetching sales by business - ${error.message}`);
    next(error);
  }
}

module.exports = {
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
};
