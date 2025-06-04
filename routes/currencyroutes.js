const express = require("express");
const router = express.Router();

const {
  getAllCurrencies,
  getAllActiveCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} = require("../controllers/currencycontroller");

// Ruta para obtener la lista de todas las monedas.
router.get("/getallcurrencies", getAllCurrencies);

// Ruta para obtener la lista de todas las monedas activos.
router.get("/getallactivecurrencies", getAllActiveCurrencies);

// Ruta para obtener un detalle de moneda.
router.get("/getcurrency/:id", getCurrencyById);

// Ruta para crear una moneda.
router.post("/create", createCurrency);

// Ruta para actualizar un detalle de moneda.
router.patch("/update/:id", updateCurrency);

module.exports = router;
