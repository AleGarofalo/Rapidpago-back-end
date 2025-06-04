const express =require('express')
const router = express.Router()

const {getAllSellingPrices,getAllActiveSellingPrices,getSellingPriceById,getSellingPrice,createSellingPrice,updateSellingPrice,deleteSellingPrice,} = require('../controllers/sellingpricecontroller');

// Ruta para obtener la lista de todas los precios de venta.
router.get('/getallsellingprices',getAllSellingPrices);

// Ruta para obtener la lista de todas los precios de venta activos.
router.get('/getallactivesellingprices',getAllActiveSellingPrices);

// Ruta para obtener un detalle de precio de venta.
router.get('/getsellingprice/:id',getSellingPriceById);

// Ruta para obtener un detalle de precio de venta.
router.get('/getprice/:currencyID/:modelID',getSellingPrice);

// Ruta para crear un precio de venta.
router.post('/create',createSellingPrice);

// Ruta para actualizar un detalle de precio de venta.
router.patch('/update/:id',updateSellingPrice); 

module.exports = router;