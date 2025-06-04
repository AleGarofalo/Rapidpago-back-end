const express =require('express')
const router = express.Router()

const {getAllFeeTypes,getAllActiveFeeTypes,getFeeTypeById,createFeeType,updateFeeType,deleteFeeType,} = require('../controllers/feetypecontroller');

// Ruta para obtener la lista de todas las tarifas.
router.get('/getallfeetypes',getAllFeeTypes);

// Ruta para obtener la lista de todas las tarifas activas.
router.get('/getallactivefeetypes',getAllActiveFeeTypes);

// Ruta para obtener un detalle de tarifa.
router.get('/getfeetype/:id',getFeeTypeById);

// Ruta para crear una tarifa.
router.post('/create',createFeeType);

// Ruta para actualizar un detalle de tarifa.
router.patch('/update/:id',updateFeeType); 

module.exports = router;