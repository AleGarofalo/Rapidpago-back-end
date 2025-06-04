const logger = require("../config/logger");
const Stock = require("../models/Stock");
const { ValidationError } = require("../middleware/errorhandler");
const moment = require("moment-timezone");

// Obtener todas las transacciones de inventario
async function getAllStocks(req, res, next) {
  try {
    logger.info("Fetching all inventory transactions");

    const stocks = await Stock.getAll();
    res.status(200).json(stocks);

    logger.info("Inventory transactions fetched successfully");
  } catch (error) {
    logger.error("Error fetching inventory transactions:", error);
    next(error);
  }
}

// Obtener transacción de inventario por ID
async function getStockById(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Fetching inventory transaction by ID: ${id}`);

    const stock = await Stock.getById(id);
    if (!stock || stock.length === 0) {
      logger.warn(`Inventory transaction not found: ${id}`);
      throw new ValidationError(
        "La transacción de inventario no se encuentra registrada"
      );
    }

    res.status(200).json(stock);
    logger.info(`Inventory transaction by ID: ${id} fetched successfully`);
  } catch (error) {
    logger.error(`Error fetching inventory transaction by ID: ${id}, ${error}`);
    next(error);
  }
}

// Obtener transacción de inventario por ID
async function getTransaction(req, res, next) {
  const { id, orderID, itemID } = req.params;
  try {
    logger.info(`Fetching inventory transaction by ID: ${id}`);

    const stock = await Stock.getStockTransaction(id, orderID, itemID);
    if (!stock || stock.length === 0) {
      logger.warn(`Inventory transaction not found`);
      throw new ValidationError(
        "La transacción de inventario no se encuentra registrada"
      );
    }

    res.status(200).json(stock);
    logger.info(`Inventory transaction by ID: ${id} fetched successfully`);
  } catch (error) {
    logger.error(`Error fetching inventory transaction by ID: ${id}, ${error}`);
    next(error);
  }
}

// Obtener inventario disponible
async function getStock(req, res, next) {
  try {
    logger.info(`Fetching stock avaliable`);

    const stock = await Stock.getInventory();
    if (!stock || stock.length === 0) {
      logger.warn(`Inventory not avaliable`);
      throw new ValidationError("No hay inventario disponible");
    }

    res.status(200).json(stock);
    logger.info(`Inventory fetched successfully`);
  } catch (error) {
    logger.error(`Error fetching inventory:
            ${error}`);
    next(error);
  }
}

// Crear una nueva transacción de inventario
async function createStock(req, res, next) {
  try {
    const data = req.body;
    logger.info("Attempting to create new inventory transaction");

    data.created_at = moment()
      .tz("America/Caracas")
      .format("YYYY-MM-DD HH:mm:ss");

    const newStock = await Stock.create(data);
    res.status(201).json(newStock);

    logger.info(`Inventory transaction created successfully: ${newStock.id}`);
  } catch (error) {
    logger.error("Error creating inventory transaction:", error);
    next(error);
  }
}

// Actualizar una transacción de inventario por ID
async function updateStock(req, res, next) {
  const { id } = req.params;
  const { itemID, orderID } = req.body;
  const data = req.body;

  try {
    logger.info(
      `Attempting to update inventory transaction with ID: ${id}, itemID: ${itemID}, saleID: ${orderID}`
    );

    const stock = await Stock.getById(id);
    if (!stock || stock.length === 0) {
      logger.warn(`Inventory transaction not found: ${id}`);
      throw new ValidationError(
        "La transacción de inventario no se encuentra registrada"
      );
    }

    data.updated_at = moment()
      .tz("America/Caracas")
      .format("YYYY-MM-DD HH:mm:ss");

    await Stock.update(id, itemID, orderID, data);

    logger.info(`Inventory transaction updated successfully: ${id}`);
    res
      .status(200)
      .json({ message: "Transacción de inventario actualizada exitosamente" });
  } catch (error) {
    logger.error(
      `Error updating inventory transaction with ID: ${id}, ${error}`
    );
    next(error);
  }
}

// Eliminar una transacción de inventario por ID
async function deleteStock(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Attempting to delete inventory transaction with ID: ${id}`);

    const stock = await Stock.getById(id);
    if (!stock || stock.length === 0) {
      logger.warn(`Inventory transaction not found: ${id}`);
      throw new ValidationError(
        "La transacción de inventario no se encuentra registrada"
      );
    }
    await Stock.delete(id);
    logger.info(`Inventory transaction deleted successfully: ${id}`);
    res
      .status(200)
      .json({ message: "Transacción de inventario eliminada exitosamente" });
  } catch (error) {
    logger.error(
      `Error deleting inventory transaction with ID: ${id}, ${error}`
    );
    next(error);
  }
}

module.exports = {
  getAllStocks,
  getStockById,
  getTransaction,
  getStock,
  createStock,
  updateStock,
  deleteStock,
};
