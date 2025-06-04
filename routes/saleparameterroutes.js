const express =require('express')
const router = express.Router()

const {getAllSaleParameters,
    getAllActiveSaleParameters,
    getSaleParameterById,
    createSaleParameter,
    updateSaleParameter,
    deleteSaleParameter} = require('../controllers/saleparametercontroller');

// Ruta para obtener la lista de todos los parametros de venta.
router.get('/getallsaleparameters',getAllSaleParameters);

// Ruta para obtener la lista de todas los parametros de venta activos.
router.get('/getallactivesaleparameters',getAllActiveSaleParameters);

// Ruta para obtener un detalle de parametro de venta.
router.get('/getsaleparameter/:id',getSaleParameterById);

// Ruta para crear un parametro de venta.
router.post('/create',createSaleParameter);

// Ruta para actualizar un detalle de parametro de venta.
router.patch('/update/:id',updateSaleParameter); 

module.exports = router;