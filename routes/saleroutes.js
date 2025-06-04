const express =require('express')
const router = express.Router()

const {getAllSales,getSaleById,createSale,updateSale,deleteSale,} = require('../controllers/Salecontroller');

// Ruta para obtener la lista de todas las ventas.
router.get('/getallsales',getAllSales);

// Ruta para obtener un detalle de venta.
router.get('/getsale/:id',getSaleById);

// Ruta para crear una venta.
router.post('/create',createSale);

// Ruta para actualizar un detalle de venta.
router.patch('/update/:id',updateSale); 

module.exports = router;