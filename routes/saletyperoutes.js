const express =require('express')
const router = express.Router()

const {getAllSaleTypes,getAllActiveSaleTypes,getSaleTypeById,createSaleType,updateSaleType,deleteSaleType,} = require('../controllers/saletypecontroller');

// Ruta para obtener la lista de todas los tipos de venta.
router.get('/getallsaletypes',getAllSaleTypes);

// Ruta para obtener la lista de todas los tipos de venta activos.
router.get('/getallactivesaletypes',getAllActiveSaleTypes);

// Ruta para obtener un detalle de tipo de venta.
router.get('/getsaletype/:id',getSaleTypeById);

// Ruta para crear un tipo de venta.
router.post('/create',createSaleType);

// Ruta para actualizar un detalle de tipo de venta.
router.patch('/update/:id',updateSaleType); 

module.exports = router;