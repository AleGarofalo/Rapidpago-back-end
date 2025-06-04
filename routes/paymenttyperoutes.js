const express =require('express')
const router = express.Router()

const {getAllPaymentTypes,getAllActivePaymentTypes,getPaymentTypeById,createPaymentType,updatePaymentType,deletePaymentType,} = require('../controllers/paymenttypecontroller');

// Ruta para obtener la lista de todas las formas de pago.
router.get('/getallpaymenttypes',getAllPaymentTypes);

// Ruta para obtener la lista de todas las formas de pago activos.
router.get('/getallactivepaymenttypes',getAllActivePaymentTypes);

// Ruta para obtener un detalle de forma de pago.
router.get('/getpaymenttype/:id',getPaymentTypeById);

// Ruta para crear una forma de pago.
router.post('/create',createPaymentType);

// Ruta para actualizar un detalle de forma de pago.
router.patch('/update/:id',updatePaymentType); 

module.exports = router;