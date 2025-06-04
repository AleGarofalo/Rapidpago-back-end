const express =require('express')
const router = express.Router()

const {getAllOrdersPayments,getPaymentsByOrderId,getPaymentsByOrderNumber,createOrderPayment,updateOrderPayment,deleteOrderPayment,} = require('../controllers/orderpaymentcontroller');

// Ruta para obtener la lista de todas los pagos de ordenes.
router.get('/getallorderspayments',getAllOrdersPayments);

// Ruta para obtener un detalle de pagos por id de orden.
router.get('/getpaymentsbyorder/:id',getPaymentsByOrderId);

// Ruta para obtener un detalle de pagos por numero de orden.
router.get('/getpaymentsbyordernumber/:id',getPaymentsByOrderNumber);

// Ruta para crear un pago de orden.
router.post('/create',createOrderPayment);

// Ruta para actualizar un detalle de pago de orden.
router.patch('/update/:id',updateOrderPayment); 

module.exports = router;