const express = require("express");
const router = express.Router();

const {
  getAllStocks,
  getStockById,
  getTransaction,
  getStock,
  createStock,
  updateStock,
  deleteStock,
} = require("../controllers/Inventorycontroller");

// Ruta para obtener la lista de todos las transacciones
router.get("/getallstock", getAllStocks);

// Ruta para obtener la lista de todos los items disponibles
router.get("/getStock", getStock);

// Ruta para obtener una transaccion por su ID
router.get("/getStockById/:id", getStockById);

// Ruta para obtener una transaccion en especifico de un item en una orden
router.get("/getTransaction/:id/:orderID/:itemID", getTransaction);

// Ruta para crear un negocio
router.post("/create", createStock);

// Ruta para actualizar un negocio
router.patch("/update/:id", updateStock);

module.exports = router;
